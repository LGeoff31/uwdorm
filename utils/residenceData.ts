export interface Residence {
  id: string;
  name: string;
  address: string;
  price_range?: string;
  rating: number;
  style: string;
  year_restriction: string;
  short_description: string;
  detailed_description: string;
  unique_features: string[];
  pros: string[];
  cons: string[];
  best_for: string;
  room_types: string[];
  meal_plan: string;
  amenities: string[];
  location_notes: string;
  accessibility: string;
}

export interface ResidenceResult {
  id: string;
  name: string;
  shortDescription: string;
  relevanceScore: number;
  matchPercentage: number;
  style: string;
  priceRange: string;
  bestFor: string;
  pros: string[];
  cons: string[];
  mealPlan: string;
  amenities: string[];
  whyChosen: string;
}

/** Map residence id → page path */
export const RESIDENCE_ID_TO_PATH: Record<string, string> = {
  v1: '/1',
  cmh: '/2',
  uwp: '/3',
  rev: '/4',
  mkv: '/5',
  united: '/9',
};

export const RESIDENCE_DATA: Residence[] = [
  {
    id: 'rev',
    name: 'Ron Eydt Village (REV)',
    address: '200 University Ave W, Waterloo',
    price_range: '$2,549 - $3,824',
    rating: 24,
    style: 'traditional',
    year_restriction: 'first_year_only',
    short_description:
      'The classic first-year dorm experience with mandatory meal plans and high social energy',
    detailed_description: `Ron Eydt Village is UWaterloo's quintessential first-year residence experience, 
    housing 960 students exclusively in shared double rooms across four quads with five floors each. 
    This is the most social residence on campus, known for its energetic atmosphere and frequent floor activities. 
    Each floor has 48 residents with gender-specific sections and shared bathrooms cleaned daily by staff. 
    REV features mandatory meal plans at REVelation dining hall, eliminating grocery budgeting stress. 
    The residence includes an on-site fitness room with cardio equipment and free weights, a 65" 4K TV lounge, 
    pool and snooker tables, basketball court, esports equipment, and a music room. Each floor has small 
    kitchenettes with microwaves and fridges for late-night snacks. The front desk operates 24/7, offering 
    printing, package pickup, and equipment rentals including movies and board games. While REV has a 
    reputation for being loud and having 'first-year shenanigans,' it's ideal for students who want to 
    meet people quickly and don't mind sharing a room. The community-focused design encourages friendships 
    through shared meals and spontaneous floor hangouts.`,
    unique_features: [
      'First-year exclusive community',
      'Mandatory all-you-can-eat meal plan at REVelation dining hall',
      'On-site fitness room (no need to walk to main campus gym)',
      'Shared double rooms only - no singles available',
      'Four quads with 5 floors each, 48 residents per floor',
      'Daily cleaned shared bathrooms',
      'Most social/party atmosphere on campus',
      '24/7 front desk with equipment rentals',
      'Floor kitchenettes with microwave and fridge',
      'Built in 1969, renovated central complex in 2002',
    ],
    pros: [
      'Easy to make friends - everyone is new',
      'No cooking or grocery shopping required',
      'High energy social atmosphere',
      'On-site fitness facilities',
      'Central location near other residences',
      'Built-in meal plan simplifies budgeting',
    ],
    cons: [
      'Can be very loud and chaotic',
      'No privacy - mandatory roommate',
      'Dining hall closes early and limited weekend hours',
      'Expensive compared to cooking own meals',
      'Shared bathrooms can get messy',
      'No air conditioning',
    ],
    best_for:
      'Outgoing first-year students who prioritize socializing, want the classic dorm experience, and prefer not to cook',
    room_types: ['Double shared rooms only'],
    meal_plan: 'Mandatory all-you-can-eat',
    amenities: [
      'Fitness room',
      'Pool/snooker tables',
      'Basketball court',
      'Music room',
      'Gaming equipment',
      '65" 4K TV lounge',
      'Central laundry',
      '24/7 front desk',
    ],
    location_notes:
      '10 minute walk to main campus buildings, adjacent to Village 1',
    accessibility:
      'Accessible parking available, remote-controlled automatic door at northeast entrance',
  },
  {
    id: 'v1',
    name: 'Village 1 (V1)',
    address: 'Waterloo, ON N2L 3G5',
    price_range: '$2,549 - $4,263',
    rating: 20,
    style: 'traditional',
    year_restriction: 'primarily_first_year',
    short_description:
      "UWaterloo's oldest and most historically rooted residence with varied room options and closest campus proximity",
    detailed_description: `Village 1 is UWaterloo's first-ever residence building, established when the 
    university was founded and nestled among mature trees that give it a distinctive character. V1 offers 
    the most diverse room configurations on campus: traditional doubles, private singles, and unique 
    interconnecting rooms (semi-private with partial walls between roommates). The building is organized 
    into 'houses' with dedicated lounges featuring full kitchenettes including stoves in some locations. 
    V1 is only a 5-minute walk to the heart of campus - the closest of all residences to academic buildings 
    like the Engineering complex, Student Life Centre, and main library. Students eat at Mudie's dining hall 
    with all-you-can-eat options. The residence features an esports lounge with dedicated gaming setups, 
    pool and snooker tables, ping pong, a music room, basketball court, and 65" 4K TV lounges. V1 has 
    strong community programming with Don support on every floor. The house lounge system creates 
    smaller sub-communities within the larger building, balancing privacy and social opportunities. 
    Some students appreciate the 'worn-in' historical vibe while others find it dated. V1 offers 
    the perfect middle ground: social enough to meet people but not as chaotic as REV.`,
    unique_features: [
      "UWaterloo's first and oldest residence building",
      'Closest residence to main campus (5 min walk)',
      'Most room variety: singles, doubles, interconnecting',
      'House lounge system with full kitchenettes (some with stoves)',
      'Esports lounge with gaming setups',
      'Nestled in mature trees for natural atmosphere',
      'Roof access for outdoor studying in warm months',
      'Historical significance and tradition',
    ],
    pros: [
      'Closest location to campus facilities',
      'Multiple room types accommodate different preferences',
      'House system creates smaller communities',
      'Less chaotic than REV but still social',
      'Full kitchenettes for cooking supplemental meals',
      'Strong sense of tradition and history',
      'Dedicated esports facilities',
    ],
    cons: [
      'Building shows its age - older facilities',
      'Shared gender-specific bathrooms',
      'Some rooms smaller than newer residences',
      'No air conditioning',
      'Can feel dated compared to CMH or MKV',
      'Meal plan is mandatory',
    ],
    best_for:
      'First-year students who want proximity to classes, value tradition, and want room choice flexibility with moderate social atmosphere',
    room_types: [
      'Single rooms',
      'Double shared rooms',
      'Interconnecting semi-private rooms',
    ],
    meal_plan: "Mandatory all-you-can-eat at Mudie's",
    amenities: [
      'Esports lounge',
      'Pool/snooker',
      'Ping pong',
      'Music room',
      'Basketball court',
      'House kitchenettes',
      'Roof access',
      'Central laundry',
      '24/7 front desk',
    ],
    location_notes:
      '5 minute walk to Engineering buildings, Student Life Centre, gym - closest to campus heart',
    accessibility: 'All-gender washroom in community centre, accessible house lounges',
  },
  {
    id: 'cmh',
    name: 'Claudette Millar Hall (CMH)',
    address: '165 University Ave W, Waterloo',
    price_range: '$2,970 - $4,676',
    rating: 22,
    style: 'traditional',
    year_restriction: 'mixed_first_upper_year',
    short_description:
      "UWaterloo's newest, most modern residence with air conditioning, all-gender bathrooms, and open-concept design",
    detailed_description: `Claudette Millar Hall is UWaterloo's flagship modern residence, opened in 2017 
    and designed with contemporary student needs in mind. CMH is the only traditional-style residence with 
    air conditioning - a massive advantage during hot months. The 12-story building features an innovative 
    all-gender bathroom system with 16 private 3-person bathrooms per floor (lockable shower stall, lockable 
    toilet stall, shared sinks), plus one single-occupancy accessible bathroom. This design maximizes privacy 
    while promoting inclusivity. Each floor has 49 beds: 8 private singles and 20 semi-private doubles with 
    moveable furniture and full/partial partitions between roommates. Six lounges per floor provide extensive 
    study and social spaces, each with full kitchens (not just microwaves). The Market dining facility offers 
    the most diverse food options on campus: made-to-order station (omelets, pastas, curries, stir-fries), 
    massive salad bar, Booster Juice, Chef the Farmer burgers, and FreshXPRESS grab-and-go meals. CMH's 
    design emphasizes natural light with floor-to-ceiling windows, creating an uplifting atmosphere. The 
    residence is centrally located between campus and University Plaza shopping, with LRT station nearby. 
    Students describe CMH as feeling more like a modern apartment building than a traditional dorm.`,
    unique_features: [
      'Only traditional residence with AIR CONDITIONING',
      'All-gender bathrooms on every floor (16 per floor)',
      'Newest residence building (opened 2017)',
      'Semi-private doubles with moveable furniture and partitions',
      'Six lounges PER FLOOR with full kitchens',
      'The Market - most diverse dining options on campus',
      '12 floors with panoramic views',
      'Open-concept, light-filled modern design',
      'Mixed first-year and upper-year students',
      'Located in heart of UW Place community hub',
    ],
    pros: [
      'Air conditioning is game-changing in summer',
      'Most modern facilities and furniture',
      'Exceptional bathroom privacy and cleanliness',
      'Best food variety with made-to-order options',
      'Huge windows with natural light',
      'Close to both campus and shopping',
      'Multiple lounges reduce crowding',
      'Inclusive all-gender bathroom design',
      'Close to engineering buildings',
    ],
    cons: [
      'Most expensive residence option',
      'Can feel less intimate due to large size',
      'Mixed year levels may affect first-year community',
      'Meal plan is mandatory',
      "Some find it too 'hotel-like' and impersonal",
      'Bathrooms shared by 3 people per stall',
    ],
    best_for:
      'Students who prioritize modern amenities, air conditioning, privacy, food variety, and do not mind higher cost',
    room_types: ['Single rooms', 'Semi-private double rooms with partitions'],
    meal_plan: 'Mandatory - The Market with diverse options',
    amenities: [
      'AIR CONDITIONING',
      'All-gender bathrooms',
      'Fitness room',
      'Multi-faith room',
      'Music room',
      'Pool/ping pong',
      'Full kitchens on every floor',
      'Central laundry',
      '24/7 front desk',
    ],
    location_notes:
      'Central to campus and University Plaza, LRT station nearby, 7 min walk to Engineering buildings',
    accessibility:
      'Single-occupancy accessible bathroom on each floor, elevator access, connected to UWP via pedestrian bridge',
  },
  {
    id: 'mkv',
    name: 'Mackenzie King Village (MKV)',
    address: '200 University Ave W, Waterloo',
    price_range: '$3,393 - $5,088',
    rating: 17,
    style: 'suite',
    year_restriction: 'all_years',
    short_description:
      'Premium suite-style living with private bedrooms, full kitchens, air conditioning, and maximum independence',
    detailed_description: `Mackenzie King Village is UWaterloo's premium suite-style residence and the 
    ONLY suite-style option with air conditioning. Built in 2002, MKV features 4-bedroom suites where each 
    student gets their own lockable private bedroom while sharing a full kitchen, large common lounge, and 
    two full bathrooms with their 3 suitemates. The building has two wings (East and West) with 4 floors each, 
    housing 40 students per floor. Meal plans are optional since each suite has a complete kitchen (full-size 
    fridge, stove, oven, counters), giving you complete control over your food budget and dietary preferences. 
    MKV residents develop strong bonds with their suitemates while maintaining independence. The residence 
    offers pool tables, ping pong, foosball, board games, and movie rentals. Front desk staff loan out 
    useful items like space heaters (winter) and water boilers for the full term. The suite-living experience 
    teaches practical life skills: grocery shopping, meal planning, cleaning coordination, and budget management. 
    MKV attracts students from all years and programs, especially Engineering students. While more expensive, 
    you're paying for privacy, air conditioning, and the flexibility to cook your own meals. The building 
    can feel quieter than traditional residences since much socializing happens within suites. This is ideal 
    for mature students who want independence while still living on campus.`,
    unique_features: [
      'ONLY suite-style residence with AIR CONDITIONING',
      'Private lockable bedrooms in 4-person suites',
      'Full kitchens with fridge, stove, oven in every suite',
      'Two full bathrooms per suite (shared by 4)',
      'Optional meal plans - cook your own food',
      'Front desk loans heaters, water boilers long-term',
      'Newest suite-style residence (2002)',
      'Strong engineering student community',
      'Two wings (East/West) for variety',
    ],
    pros: [
      'Maximum privacy with your own lockable room',
      'Air conditioning (rare for suite-style)',
      'Complete kitchen saves money vs meal plans',
      'Choose your own diet and cooking schedule',
      'Strong suitemate bonds',
      'Mature, independent living experience',
      'Less institutional than traditional dorms',
      'Bathroom shared by only 4 people',
      'Great for students who enjoy cooking',
    ],
    cons: [
      'Most expensive residence overall',
      'Less spontaneous socializing than dorms',
      'Responsible for suite cleaning and maintenance',
      'Need to grocery shop and cook',
      'Elevators are slow (stairs recommended)',
      "Can feel isolating if suitemates aren't social",
      'Limited spots - highly competitive',
      'Requires time management for meal prep',
    ],
    best_for:
      'Independent students who want privacy, enjoy cooking, value air conditioning, and prefer small-group living over large dorm communities',
    room_types: ['4-bedroom suites with private single rooms'],
    meal_plan: 'Optional - full kitchens in every suite',
    amenities: [
      'AIR CONDITIONING',
      'Pool tables',
      'Ping pong',
      'Foosball',
      'Board games',
      'Movies',
      'Equipment loans',
      'Central laundry',
      'Front desk',
    ],
    location_notes: '10 minute walk to main campus, near other residences',
    accessibility:
      'Accessible parking, East and West elevators, accessible bathrooms on main level',
  },
  {
    id: 'uwp',
    name: 'UW Place (UWP)',
    address: '159 University Ave W, Waterloo',
    price_range: '$2,677 - $4,597',
    rating: 22,
    style: 'suite',
    year_restriction: 'mixed_all_years',
    short_description:
      'Large suite-style complex with 4 courts and 2 halls offering apartment-style independence near LRT and shopping',
    detailed_description: `UW Place is UWaterloo's largest and most diverse suite-style residence complex, 
    consisting of 4 courts (Waterloo, Woolwich, Wellesley, Wilmot) and 2 halls (Beck, Eby) housing over 
    1,000 students. Students live in 2, 3, or 4-bedroom suites with private lockable bedrooms, shared 
    single-occupancy lockable bathrooms, full kitchens, and common living areas. Meal plans are optional - 
    most students cook their own meals. UWP's buildings were constructed at various times, with some showing 
    age (no air conditioning, which becomes difficult in summer heat). The residence is centrally located 
    between main campus and key amenities: University Plaza shopping, Waterloo Park, LRT station, and CMH 
    dining hall. Each court/hall has its own front entrance and character, with 20-50 residents per floor 
    and one Don for support. UWP offers true apartment-style living: you control your social life by choosing 
    when to emerge from your suite versus when to study/relax privately. Common amenities include ping pong, 
    foosball, board games, movies, and a 65" 4K TV lounge. The suite experience teaches life skills but 
    requires discipline in cleaning, grocery shopping, and coordinating with roommates. UWP attracts upper-year 
    students and first-years who want independence.`,
    unique_features: [
      'Largest residence complex (4 courts + 2 halls)',
      'Suite variety: 2, 3, or 4-bedroom options',
      'Single-occupancy lockable bathrooms in suites',
      'Optional meal plans with full kitchens',
      'Connected to CMH dining via pedestrian bridge',
      'LRT station and University Plaza adjacent',
      'Waterloo Park nearby for outdoor activities',
      'Beck Hall has shared double rooms (traditional style)',
      'Mixed first-year and upper-year communities',
      'Each court has unique layout and vibe',
    ],
    pros: [
      'Apartment-style independence and privacy',
      'Kitchen saves money vs meal plans',
      'Excellent location: campus, LRT, shopping, park',
      'Multiple suite sizes for different preferences',
      'Private bathroom per person',
      'Less institutional than traditional dorms',
      "Access to CMH's excellent dining hall",
      'Choose your own social/study balance',
      'Good for upper-year students',
    ],
    cons: [
      'NO AIR CONDITIONING (major issue in summer)',
      "Buildings feel dated and 'crusty'",
      'Heat can be unbearable May-August',
      'Responsible for cleaning and cooking',
      'Can feel isolated without proactive socializing',
      'Grocery shopping and meal prep takes time',
      'Some courts farther from campus than others',
      'Less community feel than traditional dorms',
    ],
    best_for:
      'Students who want apartment-style independence, are willing to cook, and do not mind older buildings',
    room_types: [
      '2, 3, or 4-bedroom suites with private rooms',
      'Beck Hall: shared double rooms',
    ],
    meal_plan: 'Optional - full kitchens in suites',
    amenities: [
      'Ping pong',
      'Foosball',
      'Board games',
      'Movies',
      '65" 4K TV lounge',
      'Central laundry',
      'All-gender washrooms on main floors',
      'Front desk',
    ],
    location_notes:
      'Central to campus, LRT station, University Plaza, Waterloo Park, connected to CMH via bridge',
    accessibility:
      'All-gender washrooms on main floor lounges, elevator access in halls and courts',
  },
  {
    id: 'united',
    name: 'United College',
    address: '190 Westmount Rd N, Waterloo',
    price_range: 'Contact for pricing',
    rating: 11,
    style: 'college',
    year_restriction: 'all_years',
    short_description:
      'Small, intimate college residence with focus on environment, social innovation, and freshly-prepared local food',
    detailed_description: `United College is a small, close-knit university college residence affiliated 
    with UWaterloo, emphasizing environmental sustainability, international development, Indigenous affairs, 
    and social innovation. United offers a uniquely intimate community compared to large Campus Housing 
    residences. Room options include traditional singles and doubles with shared floor bathrooms, plus 
    newer GreenHouse wing rooms with private ensuite bathrooms, double beds, and individual temperature 
    control (heat AND air conditioning). All United residents have mandatory all-you-can-eat meal plans 
    at Watson's Eatery, where food is prepared fresh daily with 80% locally-sourced ingredients. The head 
    chef accepts recipe suggestions from residents, creating personalized dining experiences. Menus 
    accommodate vegetarian, vegan, halal, gluten-free, and dairy-free needs. United features on-site 
    laundry, a full gymnasium, fitness spaces, movie and game rooms, indoor bike storage, and dedicated 
    music/creativity/study spaces. The residence emphasizes community building through its small size and 
    shared values around sustainability and social impact. United attracts students passionate about 
    environmental issues, social justice, and making meaningful connections.`,
    unique_features: [
      'Small, intimate community focused on sustainability and social innovation',
      'GreenHouse wing with private ensuite bathrooms and double beds',
      'Individual temperature control (AC and heating) in newer rooms',
      "Watson's Eatery with 80% local ingredients, chef accepts resident recipes",
      'Strong environmental and social justice values/programming',
      'Full on-site gymnasium',
      'On main UWaterloo campus',
      'Hotel-style guest rooms for family visits',
      'Graduate building with apartments for upper-year/grad students',
    ],
    pros: [
      'Tight-knit community where everyone knows each other',
      'Focus on sustainability and social impact',
      'Ensuite bathrooms available (GreenHouse wing)',
      'Air conditioning in newer rooms',
      'Exceptional fresh, local food with customization',
      'Full gymnasium on site',
      'Strong support systems and counseling',
      'Leadership opportunities in small setting',
      'Accommodates all dietary restrictions',
    ],
    cons: [
      'Farther from main campus than Campus Housing',
      'Very small community (not for everyone)',
      'Limited room availability',
      'Older traditional rooms have shared bathrooms',
      'Meal plan is mandatory',
      'Can feel isolated from main campus social scene',
      'More expensive than some Campus Housing options',
    ],
    best_for:
      'Students passionate about sustainability, social justice, seeking small tight-knit community, who value fresh local food',
    room_types: [
      'Traditional singles and doubles (shared bathrooms)',
      'GreenHouse wing private rooms with ensuite bathrooms',
      'Graduate apartments',
    ],
    meal_plan:
      "Mandatory all-you-can-eat at Watson's Eatery (local, fresh, customizable)",
    amenities: [
      'Full gymnasium',
      'Fitness spaces',
      'Game rooms',
      'Movie rooms',
      'Music/creativity spaces',
      'Indoor bike storage',
      'GreenHouse wing with AC',
      'Laundry',
      'Counseling services',
    ],
    location_notes:
      'On main UWaterloo campus at 190 Westmount Rd N, accessible by GRT bus and LRT',
    accessibility:
      'Private ensuite bathrooms in GreenHouse wing, elevator access, accommodations available',
  },
];
