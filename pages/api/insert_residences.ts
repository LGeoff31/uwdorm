import type { NextApiRequest, NextApiResponse } from 'next';
import { DataAPIClient, VectorDoc, UUID } from '@datastax/astra-db-ts';
import { pipeline } from '@xenova/transformers';
const { v4: uuidv4 } = require('uuid');

interface Idea extends VectorDoc {
  idea: string;
}

export default async function find_residence(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const api_key: string = process.env.ASTRA_API_KEY || '';
      const api_endpoint: string = process.env.ASTRA_API_ENDPOINT || '';
      if (!api_key || !api_endpoint) {
        throw new Error('Environment variables ASTRA_API_KEY or ASTRA_API_ENDPOINT are missing.');
      }

      console.log('API Key and Endpoint are set');
      
      const client = new DataAPIClient(api_key);
      const db = client.db(api_endpoint);

      if (!db) {
        throw new Error('Failed to connect to the database.');
      }

      console.log('Connected to the database');

      const collection = await db.createCollection<Idea>('residences', {
        vector: {
          dimension: 384,
          metric: 'cosine',
        },
        checkExists: false,
      });

      console.log('Collection created or exists');

      const pipe = await pipeline('feature-extraction', 'Supabase/gte-small');
      const texts_to_embed = [`Claudette Millar Hall (CMH), students can choose between Single Rooms and Double Rooms. Single Rooms feature a bed, desk, chair, wardrobe, and bookshelf, with some including en-suite bathrooms. Double Rooms are shared and offer similar furnishings, providing an affordable option for students who prefer having a roommate.
The residence offers various facilities and amenities to enhance student life. Each floor includes quiet study areas and collaborative spaces equipped with desks, chairs, and power outlets. Lounges with comfortable seating, a TV, and sometimes a kitchenette are available on each floor for relaxation and socialization. Recreational areas feature pool tables, foosball, and other games. A small fitness room with basic exercise equipment is provided, along with 24/7 laundry facilities containing washers and dryers.
Dining options include a dining hall with a variety of meal choices, including vegetarian and vegan options, and available meal plans. Shared kitchens on each floor allow students to prepare their own meals if preferred.
Safety and security are prioritized with key card access required for entering the building and floors, a 24/7 front desk for assistance, and comprehensive emergency systems including fire alarms, sprinkler systems, and emergency call buttons.
CMH's location is convenient, being within walking distance of key campus buildings such as the Math and Computer (MC) Building, Davis Centre (DC), Engineering 5 (E5), Dana Porter Library, Health Services, and the Student Life Centre (SLC). The residence is also close to public transit stops for easy access to Waterloo and neighboring cities.
The community support includes a Residence Life Team consisting of full-time Residence Life Coordinators (RLCs) and senior student Residence Dons. They facilitate various events and activities, including Welcome Week, study groups, cultural celebrations, health and wellness workshops, social events, and community service projects to foster engagement and support student well-being.
Single Rooms come with a Twin XL bed, desk, ergonomic chair, built-in wardrobe, bookshelf, and lighting. Some rooms include en-suite bathrooms with a shower, toilet, sink, and mirror. Double Rooms provide two Twin XL beds, desks, chairs, wardrobes, bookshelves, and shared storage space, along with desk lamps and overhead lighting. Common areas include lounges with a TV and kitchenette, study rooms with desks and chairs, recreational spaces with games, a fitness room with exercise equipment, and laundry facilities with online status checking.
`,`United College (UC) is a close-knit community at the University of Waterloo, providing a supportive environment for students to share ideas, discover themselves, and explore ways to make a positive impact in the world. The residence offers a range of accommodations designed to foster a sense of belonging and engagement.
United College features Single Rooms and Double Rooms, each designed for comfort and functionality. Single Rooms come with essential furnishings, including a bed, desk, chair, and wardrobe. Double Rooms are shared, offering similar amenities and providing a budget-friendly option for students who prefer living with a roommate.
The residence boasts a variety of facilities and amenities to enhance student life. Each floor is equipped with quiet study areas and collaborative spaces featuring desks, chairs, and power outlets. Lounges on each floor provide comfortable seating, a TV, and sometimes a kitchenette, perfect for relaxation and social activities. Recreational areas with games and a small fitness room with basic exercise equipment are available for residents to enjoy. Additionally, 24/7 laundry facilities are provided, including washers and dryers.
Dining options at United College include a dining hall with a selection of meal choices, including vegetarian and vegan options. Meal plans are available, and shared kitchens on each floor enable students to prepare their own meals if desired.
Safety and security are prioritized with key card access required for entering the building and floors. A 24/7 front desk is available for assistance, and comprehensive emergency systems include fire alarms, sprinkler systems, and emergency call buttons.
The location of United College is convenient, situated at 190 Westmount Rd N, Waterloo, and is well-connected to the campus and surrounding areas. The residence is within walking distance of key campus buildings and public transit stops, providing easy access to various parts of Waterloo.
Community support at United College includes a dedicated Residence Life Team, comprising full-time Residence Life Coordinators (RLCs) and senior student Residence Dons. They organize and facilitate various events and activities, including Welcome Week, study groups, cultural celebrations, health and wellness workshops, social events, and community service projects, aimed at enhancing student engagement and well-being.
Single Rooms are furnished with a bed, desk, chair, wardrobe, and lighting, ensuring a comfortable and private living space. Double Rooms come with two beds, desks, chairs, wardrobes, and shared storage space, along with desk lamps and overhead lighting. Common areas include lounges with a TV and kitchenette, study rooms with desks and chairs, recreational spaces with games, and laundry facilities with online status checking.
`, `UW Place (UWP) is a suite-style residence community at the University of Waterloo, offering a blend of privacy and communal living. With its central location, UWP is a convenient choice for students who want to be close to the heart of campus, Waterloo Park, the LRT station, and University Plaza.
UWP consists of a mix of single rooms and shared suites, providing students with flexible living arrangements. The suites typically include private bedrooms, each furnished with a bed, desk, chair, and wardrobe. Common areas within the suites include a shared living room, dining area, and a fully equipped kitchen, allowing students the option to cook their own meals. The suites also feature shared bathrooms, adding to the homely feel of the residence.
Each floor of UWP offers study rooms equipped with desks, chairs, and power outlets, catering to students who need a quiet place to focus. There are also lounges on each floor, furnished with comfortable seating, a TV, and sometimes a kitchenette, providing ideal spaces for relaxation and socializing with fellow residents. For recreation, UWP includes several common areas with games such as pool tables and foosball, as well as a small fitness room with basic exercise equipment. The residence also provides 24/7 laundry facilities, complete with washers, dryers, and online status checking for added convenience.
UWP residents have access to various dining options, including nearby campus dining halls offering a wide range of meal choices, with vegetarian and vegan options available. For those who prefer cooking, the fully equipped kitchens in each suite make it easy to prepare meals at home.
Safety and security are top priorities at UWP, with key card access required to enter the buildings and individual suites. A 24/7 front desk is available for assistance, and the residence is equipped with comprehensive emergency systems, including fire alarms, sprinkler systems, and emergency call buttons.
The location of UWP is highly convenient, situated at 159 University Ave W, Waterloo. It is within walking distance of key campus buildings, including the Student Life Centre (SLC) and Health Services. The residence is also near public transit stops, making it easy for students to travel around Waterloo and to neighboring cities.
Community life at UWP is vibrant, supported by a dedicated Residence Life Team consisting of full-time Residence Life Coordinators (RLCs) and senior student Residence Dons. They organize and host a variety of events and activities, including Welcome Week, study groups, cultural celebrations, health and wellness workshops, social events, and community service projects, all aimed at fostering a sense of community and enhancing student well-being.
UWP's accommodations include private bedrooms within suites, each furnished with a bed, desk, chair, wardrobe, and adequate lighting. Shared spaces within the suites include living rooms with seating, dining areas, kitchens equipped with appliances, and shared bathrooms. The residence also offers lounges with TVs and kitchenettes, study rooms, recreational areas with games, fitness facilities, and 24/7 laundry services, ensuring a well-rounded living experience for all residents.
`, `Renison University College (RUC) is a unique and close-knit residential community at the University of Waterloo, offering a small, friendly environment within the larger campus setting. Renison is known for its distinctive programs and supportive atmosphere, providing students with opportunities to engage deeply with their studies, peers, and the broader community.
Renison offers a mix of single and double rooms, catering to different student preferences. Single rooms come furnished with a bed, desk, chair, wardrobe, and bookshelf, providing a private space for students to focus on their academics. Double rooms, which are shared by two students, include similar furnishings and offer an affordable living option for those who enjoy a more communal experience. Some rooms at Renison also feature en-suite bathrooms for added convenience.
Each floor at Renison includes study areas equipped with desks, chairs, and power outlets, ensuring that students have quiet spaces to work. Lounges on each floor are furnished with comfortable seating, a TV, and sometimes a kitchenette, making them ideal spots for relaxation and socializing. The residence also provides recreational spaces with games such as pool tables and foosball, promoting a lively community atmosphere. A small fitness room with basic exercise equipment is available, along with 24/7 laundry facilities that include washers, dryers, and online status checking.
Dining at Renison is convenient and varied. The residence has its own dining hall offering a range of meal options, including vegetarian and vegan choices, catering to different dietary needs. Students who prefer to cook their own meals can make use of the shared kitchens available on each floor.
Renison places a strong emphasis on safety and security, with key card access required for entering the building and individual floors. A 24/7 front desk is available to provide assistance whenever needed, and the residence is equipped with comprehensive emergency systems, including fire alarms, sprinkler systems, and emergency call buttons.
Located at 240 Westmount Rd N, Waterloo, Renison is within easy reach of the main University of Waterloo campus and its facilities. Students can enjoy the benefits of a smaller, tight-knit community while still having access to the broader services and amenities of the university. The residence is also conveniently located near public transit stops, providing easy access to Waterloo and the surrounding areas.
Renison's community is supported by a Residence Life Team that includes full-time Residence Life Coordinators (RLCs) and senior student Residence Dons. This team organizes a variety of events and activities throughout the year, including Welcome Week, study groups, cultural celebrations, health and wellness workshops, social events, and community service projects. These activities are designed to foster engagement, build a strong sense of community, and support the overall well-being of students.
Accommodations at Renison include both single and double rooms, each furnished with a bed, desk, chair, wardrobe, bookshelf, and lighting. Some rooms offer en-suite bathrooms with a shower, toilet, sink, and mirror. Common areas within the residence feature lounges with TVs and kitchenettes, study rooms with desks and chairs, recreational spaces with games, a fitness room with exercise equipment, and 24/7 laundry facilities, ensuring a well-rounded living experience for all residents
`, `At Village 1 (V1), students have the opportunity to live in a residence with a rich history, offering a mix of Single Rooms and Double Rooms. Single Rooms are furnished with a bed, desk, chair, and wardrobe, providing a private and comfortable living space. Double Rooms are shared and come with similar furnishings, making them an affordable choice for students who prefer having a roommate.
Village 1 provides a variety of facilities and amenities to support student life. Each floor features quiet study areas and collaborative spaces equipped with desks, chairs, and power outlets. Lounges on each floor offer comfortable seating, a TV, and a kitchenette for relaxation and socialization. Recreational areas are available with pool tables, foosball, and other games, creating opportunities for fun and relaxation. A small fitness room with basic exercise equipment is also provided, along with 24/7 laundry facilities that include washers and dryers.
Dining options at Village 1 include a dining hall with diverse meal choices, including vegetarian and vegan options. Meal plans are available, and shared kitchens on each floor allow students to prepare their own meals if preferred.
Safety and security are top priorities, with key card access required for entering the building and floors. The residence has a 24/7 front desk for assistance and comprehensive emergency systems, including fire alarms, sprinkler systems, and emergency call buttons.
Village 1's location is convenient, situated within walking distance of key campus buildings such as the Math and Computer (MC) Building, Davis Centre (DC), Engineering 5 (E5), Dana Porter Library, Health Services, and the Student Life Centre (SLC). Public transit stops nearby provide easy access to Waterloo and surrounding areas.
The Residence Life Team at Village 1, consisting of full-time Residence Life Coordinators (RLCs) and senior student Residence Dons, supports the community by organizing various events and activities. These include Welcome Week, study groups, cultural celebrations, health and wellness workshops, social events, and community service projects, all aimed at fostering engagement and supporting student well-being.
Single Rooms come with a Twin XL bed, desk, ergonomic chair, built-in wardrobe, bookshelf, and lighting. Double Rooms feature two Twin XL beds, desks, chairs, wardrobes, bookshelves, and shared storage space, with additional desk lamps and overhead lighting. Common areas include lounges with a TV and kitchenette, study rooms with desks and chairs, recreational spaces with games, a fitness room with exercise equipment, and laundry facilities with online status checking.
`,`At Mackenzie King Village (MKV), students live in four-bedroom suites, each featuring a private bedroom with a Twin XL bed, desk, ergonomic chair, wardrobe, and bookshelf. The suites also include a shared living area with a sofa, table, and chairs, and an in-suite kitchen equipped with a fridge, stove, and storage space. Each suite comes with a private bathroom, including a shower, toilet, sink, and mirror, offering students the convenience and comfort of a home-like environment.
The residence offers various facilities and amenities to enhance student life. Each floor has quiet study areas and lounges with comfortable seating and a TV, creating spaces for both focused work and relaxation. Recreational areas with pool tables, foosball, and other games are available for socialization and entertainment. A small fitness room with basic exercise equipment is provided for those who want to stay active, and 24/7 laundry facilities with washers, dryers, and an online status checking system ensure that students can manage their laundry needs conveniently.
While students have the option to cook in their suites, dining plans are also available for those who prefer to eat at various campus locations, offering a variety of meal choices, including vegetarian and vegan options. The shared kitchens in the suites allow for meal preparation, giving students flexibility in their dining options.
Safety and security are prioritized at MKV, with key card access required for entering the building and individual floors. A 24/7 front desk is available for assistance, and comprehensive emergency systems, including fire alarms, sprinkler systems, and emergency call buttons, are in place to ensure student safety.
MKV's location is convenient, being situated at 200 University Ave W, within walking distance of key campus buildings, public transit stops, and other essential services. This makes it easy for students to access academic facilities, libraries, and student services, as well as explore the surrounding area.
The community support at MKV is robust, with a Residence Life Team consisting of full-time Residence Life Coordinators (RLCs) and senior student Residence Dons. They organize various events and activities throughout the year, including Welcome Week, study groups, wellness workshops, social events, and community service projects, fostering a sense of community and supporting student well-being. MKV provides a perfect blend of independence and community, making it an ideal residence for students who value privacy while enjoying the social aspects of campus life.
`,`At Ron Eydt Village (REV), students can choose from Single and Double Rooms, both designed to meet the needs of first-year students. Single Rooms are equipped with a Twin XL bed, desk, chair, wardrobe, and bookshelf, providing a private and comfortable space for students. Double Rooms, which are shared, offer similar furnishings and are an affordable option for students who prefer to have a roommate. The shared living arrangement fosters a strong sense of community among residents.
REV offers a variety of facilities and amenities to enhance the student experience. Each floor includes study areas designed for quiet, focused work, as well as lounges with comfortable seating and a TV for relaxation and socializing. For recreation, students have access to game rooms with pool tables, foosball, and other games. A fitness room with basic exercise equipment is available, allowing students to stay active without leaving the residence. The 24/7 laundry facilities, equipped with washers and dryers, ensure that students can conveniently manage their laundry needs, and the online status checking system adds an extra layer of convenience.
Dining options are plentiful, with an on-site dining hall offering a variety of meal choices, including vegetarian and vegan options. Meal plans are available, making it easy for students to enjoy nutritious meals without having to worry about cooking. For those who prefer to prepare their own meals, shared kitchens on each floor are equipped with basic appliances, allowing students to cook whenever they wish.
Safety and security are top priorities at REV, with key card access required for entering the building and individual floors. A 24/7 front desk is staffed to provide assistance whenever needed, and the residence is equipped with comprehensive emergency systems, including fire alarms, sprinkler systems, and emergency call buttons, ensuring that students feel safe and secure at all times.
REV's location at 200 University Ave W is highly convenient, with easy access to key campus buildings, public transit stops, and essential services. This central location allows students to quickly reach academic facilities, libraries, and student services, as well as explore nearby areas, including the Student Life Centre (SLC) and other campus amenities.
The community at REV is vibrant and supportive, with a dedicated Residence Life Team composed of full-time Residence Life Coordinators (RLCs) and senior student Residence Dons. They organize a wide range of events and activities throughout the year, including Welcome Week, study groups, wellness workshops, social events, and community service projects. These activities are designed to foster engagement, build friendships, and support student well-being, making REV an excellent choice for first-year students seeking a lively and inclusive residential experience.
`,`At Columbia Lake Village (CLV), students can choose between townhouse-style accommodations that offer a blend of privacy and community living. Each townhouse is designed to house multiple students, providing a shared living environment with individual bedrooms. The bedrooms are furnished with a bed, desk, chair, and wardrobe, offering a comfortable and personal space for each resident. Shared spaces within the townhouses include a living room, kitchen, and bathroom, allowing students to enjoy the benefits of communal living while still having their own private areas.
CLV offers a range of facilities and amenities aimed at enhancing the student experience. The townhouse complex includes quiet study areas where students can focus on their academic work, as well as common areas designed for socializing and relaxation. These spaces are furnished with comfortable seating and may include amenities such as a TV and a kitchenette. Outdoor recreational areas are also available, providing opportunities for activities like barbecuing, sports, and group events. Additionally, the village has laundry facilities equipped with washers and dryers, making it easy for students to manage their laundry needs on-site.
For dining, CLV is located near campus dining halls that offer a variety of meal options, including vegetarian and vegan choices. While meal plans are available, the private kitchens in each townhouse allow students the flexibility to prepare their own meals according to their preferences and schedules, fostering a sense of independence.
Safety and security are key priorities at CLV, with measures such as key card access for entering the complex and individual townhouses. A 24/7 front desk is available to assist residents with any concerns, and the complex is equipped with comprehensive emergency systems, including fire alarms, sprinkler systems, and emergency call buttons, ensuring a safe living environment.
CLV's location at 85 Columbia St W provides convenient access to campus facilities and services. The village is connected to the main campus via a short walk or bus ride, making it easy for students to reach academic buildings, libraries, and student services. The proximity to public transit also allows students to explore the surrounding areas, including nearby parks and shopping centers.
The community at CLV is diverse and supportive, with a Residence Life Team dedicated to fostering a sense of belonging among residents. The team organizes a variety of events and activities throughout the year, including cultural celebrations, study groups, wellness workshops, and social gatherings. These events are designed to help students connect with one another, build friendships, and support their overall well-being, making CLV a welcoming and inclusive community for both first-year and upper-year students.
`]

      await Promise.all(texts_to_embed.map(async (text, index) => {
        const output = await pipe(text, {
          pooling: 'mean',
          normalize: true,
        });

        const embedding: number[] = Array.from(output.data);
        console.log(`Embedding generated for index ${index}`);
        const uuid = uuidv4();
        const document = [
          {
            _id: new UUID(uuid),
            idea: text,
            $vector: embedding,
          }
        ]
        try {
          const inserted = await collection.insertMany(document);
          console.log('Document inserted', inserted);
          res.status(200).json({ insertedCount: inserted.insertedCount });
        } catch (e) {
          console.error('Error inserting documents:', e);
          res.status(400).json({ error: 'Documents already exist in the database.' });
        }
      }));
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Failed to process request' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

