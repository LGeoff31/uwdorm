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
      const texts_to_embed = [`Mackenzie King Village (MKV) is a popular choice among upper-year students but also accommodates 
        first-year students. Known for its apartment-style living, MKV offers a unique residence experience with a blend of independence
         and community living. The residence has a modern design and is more private compared to other traditional first-year residences,
          making it appealing for students who prefer a quieter environment.MKV offers a variety of amenities that cater to the needs of 
          students. Each apartment is fully furnished with a living room, kitchen, and dining area, allowing students to cook their own 
          meals and have more control over their living space. The building includes study rooms, a common lounge, and laundry facilities. 
          While MKV doesn't have as many organized events as traditional first-year residences, students often form close-knit communities 
          within their apartments. There are opportunities to participate in residence events and clubs, although these may not be as 
          frequent or large-scale as in residences like V1 or CMH.MKV provides apartment-style living with each unit housing four students
           in single rooms. The apartments include two bathrooms, a kitchen, and a living area, giving students the ability to cook their
            own meals. This setup is ideal for students who prefer to prepare their own food, as there is no mandatory meal plan. However,
             students can opt for a meal plan if they prefer to dine at the various on-campus food services.MKV is centrally located on 
             campus, making it convenient for students to reach their classes and other facilities. It's about a 10-minute walk to the 
             Engineering buildings (such as E7), the library, and the Physical Activities Complex (PAC).MKV is relatively close to UW 
             Plaza, making it easy for students to access off-campus amenities such as restaurants, grocery stores, and other shops. 
             The walk to UW Plaza is approximately 10-15 minutes, which is quite far.`, `Ron Eydt Village, commonly known as REV, is one of the largest residence complexes at the University of Waterloo. It's a traditional-style dormitory that offers a vibrant and social atmosphere, making it popular among first-year students. REV is known for its active community life, with a reputation for being lively and engaging, fostering a strong sense of camaraderie among its residents.REV features a variety of amenities designed to enhance the student experience. It has common lounges on each floor, study spaces, and laundry facilities available for all residents. The residence is also home to various social and academic events, ranging from movie nights to study sessions, which help to build a strong sense of community. There are also intramural sports teams and other recreational activities that students can participate in, making REV a hub for both academic and social life on campus.REV offers traditional dormitory-style rooms, with students sharing double rooms. Each floor has shared washroom facilities, which are regularly cleaned. As for dining, REV is connected to the Village 1 cafeteria, which provides a variety of meal options throughout the day. There is no need for students to cook, as the meal plan covers a range of options, including vegetarian and halal meals. This setup is particularly convenient for students who prefer a structured dining plan over self-catering. REV is very far in terms of proximity to key academic buildings compared to other residences. It's about a 10-15 minute walk to Engineering 7 (E7) and the Davis Centre (DC). The Dana Porter Library  and the Physical Activities Complex (PAC) are also quite far, typically around 10 minutes. This makes REV a bad choice for students who want to be close to both academic and recreational facilities.REV is about a 15-20 minute walk from University Shops Plaza (UW Plaza), where students can find a variety of restaurants, cafes, and retail shops. This makes it hard for students to grab a meal, coffee, or pick up essentials between classes or during weekends. The slightly longer distance to UW Plaza compared to other residences is balanced by the active social environment and the convenience of on-campus amenities.
`, `Village 1 (V1) is one of the most iconic and historic residences at the University of Waterloo, offering a traditional dormitory-style living experience that is especially popular among first-year students. Known for its vibrant community and active social scene, V1 provides an ideal environment for students who are looking to immerse themselves in campus life. The residence features a mix of single and double rooms, with shared washroom facilities on each floor, which are regularly cleaned to ensure a comfortable living environment. V1's close-knit community is fostered through a variety of residence events, including movie nights, study groups, and intramural sports, making it easy for students to form lasting friendships.V1 offers a range of amenities designed to meet the needs of its residents. Each floor has common lounges where students can relax and socialize, as well as study rooms that provide a quiet space for academic work. The residence is connected to the Village 1 cafeteria, which offers a diverse selection of meals, including vegetarian and halal options, making it convenient for students who prefer a structured dining plan. For those who enjoy cooking their own meals, V1 also has communal kitchen areas available.Located on the northern side of campus, V1 is relatively close to key academic buildings, making it convenient for students to get to their classes. It’s about a 10-minute walk to the Engineering buildings (like E7) and the Davis Centre (DC), and similarly close to the Dana Porter Library and the Physical Activities Complex (PAC). This central location makes V1 a practical choice for students who want easy access to both academic and recreational facilities.In terms of off-campus amenities, V1 is about a 10-15 minute walk from University Shops Plaza (UW Plaza), where students can find a variety of restaurants, cafes, and shops. This proximity allows for convenient access to essentials, making it easy for students to grab a meal or coffee between classes or on weekends. V1’s combination of a vibrant community, convenient amenities, and central location makes it a popular choice for first-year students looking to get the most out of their university experience.
`, `United College, formerly known as St. Paul's University College, is a residence that offers a unique blend of community and academic support, making it an excellent choice for students who value both social engagement and academic success. United College is known for its strong sense of community, with a smaller, close-knit group of residents compared to larger residences on campus. This fosters an environment where students can easily form meaningful connections with their peers and participate in a variety of community-focused events and activities.The residence primarily offers single rooms, providing students with privacy while still being part of a larger community. Each room is fully furnished, with shared washroom facilities that are regularly maintained. United College also offers common areas, including lounges, study rooms, and a dining hall, where students can gather for meals, group study sessions, or just to relax and unwind. The dining hall at United College is known for its high-quality meals, with a focus on local and sustainable food options, catering to a variety of dietary needs including vegetarian, vegan, and halal.United College places a strong emphasis on academic support and leadership development. The residence is home to several academic programs and living-learning communities, including the International Development and the Environment and Business programs. These programs offer students opportunities to engage with like-minded peers, participate in specialized events, and receive support from faculty and staff. Additionally, United College hosts numerous workshops, guest lectures, and leadership development programs that are designed to enhance the student experience both academically and personally.In terms of location, United College is conveniently situated on the western side of the University of Waterloo campus, making it a short walk to many academic buildings, including the Environment buildings and the Mathematics and Computer building. The residence is also close to the Hagey Hall of Humanities, providing easy access for students in arts and humanities programs. The central location allows students to easily access campus amenities, such as libraries and recreational facilities, while still enjoying a quieter, more secluded living environment.United College is also relatively close to off-campus amenities. It’s about a 15-minute walk to University Shops Plaza (UW Plaza), where students can find various restaurants, cafes, and shops. The residence’s proximity to green spaces, including nearby parks and walking trails, offers students a peaceful retreat from the bustle of campus life, making it an ideal choice for those who value both convenience and a strong community atmosphere.
`, `University of Waterloo Place (UWP) is a popular residence complex that offers a diverse range of living options, making it suitable for students at different stages of their university journey. UWP is known for its apartment-style and suite-style accommodations, providing a more independent living experience compared to traditional dormitories. This setup is particularly appealing to upper-year students and those who prefer a balance between privacy and community living.The residence offers a mix of furnished apartments and suites, with each unit typically housing four to five students. Apartments come with a full kitchen, living area, and bathroom, allowing students to cook their own meals and enjoy a more self-sufficient lifestyle. This is ideal for students who prefer the flexibility of cooking or who have specific dietary needs. For those who prefer not to cook, UWP is also home to Mudie’s, a large dining hall that offers a variety of meal options throughout the day, catering to different tastes and dietary preferences.UWP features several amenities designed to support both academic and social life. The residence includes study rooms, common lounges, and recreational facilities, offering students spaces to study, relax, or engage in social activities. UWP is known for its active community life, with numerous events, clubs, and intramural sports that help foster a sense of belonging among residents. The residence also has a strong focus on leadership and community engagement, with various programs aimed at enhancing students' university experience.Located on the western side of the University of Waterloo campus, UWP is conveniently close to many academic buildings, particularly those in the Engineering and Science faculties. The residence is a short walk from the Davis Centre and the Quantum-Nano Centre, making it an excellent choice for students in those programs. UWP's location also provides easy access to other campus amenities, including libraries, the Student Life Centre, and the Physical Activities Complex (PAC).UWP is relatively close to University Shops Plaza (UW Plaza), which is about a 10-15 minute walk from the residence. This proximity allows students to easily access off-campus services, such as grocery stores, restaurants, and retail shops. The residence is also well-served by public transit, making it easy for students to explore the surrounding areas or commute to co-op placements. UWP's combination of modern living spaces, community engagement, and convenient location makes it a popular choice among students who want a well-rounded university experience.
`, `Claudette Millar Hall (CMH) is one of the newest residence buildings at the University of Waterloo, offering a modern and vibrant living environment that is especially popular among first-year students. Known for its contemporary design and focus on student wellness, CMH provides a residence experience that balances privacy with a strong sense of community. The hall's design incorporates ample natural light, open common areas, and comfortable living spaces, making it an attractive option for students who value both aesthetics and functionality in their living environment.CMH offers suite-style accommodations, with each suite typically housing four students in single rooms. The suites include two bathrooms, a common living area, and a kitchenette with a microwave and fridge, allowing students to store and prepare simple meals. This setup provides a comfortable balance between personal space and shared living, making it easier for students to connect with their suitemates while also having the privacy of their own room.One of the standout features of CMH is its wide range of amenities designed to enhance the student experience. The residence includes multiple study rooms, lounges, and collaborative spaces, as well as a large dining hall that serves a variety of meal options throughout the day. The dining hall offers a diverse menu that caters to different dietary needs, including vegetarian, vegan, and halal options, ensuring that all students have access to nutritious meals. Additionally, CMH is home to a fitness center, providing students with convenient access to exercise facilities without having to leave the building.CMH is centrally located on campus, making it an ideal residence for students who want to be close to academic buildings and other campus facilities. It's just a short walk from the Mathematics and Computer Science buildings, the Student Life Centre, and the Davis Centre, making it particularly convenient for students in related programs. The residence is also close to the main bus routes, providing easy access to other parts of the campus and the surrounding community.While CMH fosters a strong sense of community through various residence events and programs, it also provides opportunities for students to engage in leadership and personal development activities. The residence has a dedicated team of residence life staff who organize social, academic, and wellness events, helping students to make the most of their time at university. CMH's combination of modern living spaces, comprehensive amenities, and convenient location makes it a top choice for students who want a dynamic and supportive residence experience.
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

