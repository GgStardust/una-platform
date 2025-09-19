import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, DollarSign, Award, Heart, BookOpen, Palette, Scissors, Car, PawPrint, PenTool } from 'lucide-react';

interface SuccessStory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  category: string;
  keyMetrics: string[];
  quickImpact: string;
  fullStory: string;
  type: 'original' | 'case-study';
}

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  category: string;
  fullStory: string;
  keyTakeaways: string[];
  businessType: string;
  challenge: string;
  solution: string;
  results: string[];
}

const successStories: SuccessStory[] = [
  // ORIGINAL 6 Success Stories (short & punchy)
  {
    id: 'maria-rodriguez',
    title: "Maria Rodriguez",
    subtitle: "Founder, East Bay Community Gardens",
    icon: <Users className="h-8 w-8" />,
    category: "Community Development",
    keyMetrics: ["3 to 12 gardens", "City collaboration", "Grant access", "Network expansion"],
    quickImpact: "Expanded from 3 to 12 community gardens in just two years through UNA formation and city partnerships.",
    fullStory: "maria-rodriguez",
    type: 'original'
  },
  {
    id: 'james-chen',
    title: "James Chen",
    subtitle: "Organizer, Mutual Aid Network",
    icon: <Heart className="h-8 w-8" />,
    category: "Mutual Aid",
    keyMetrics: ["$250K distributed", "Bank account access", "Large donations", "Organization coordination"],
    quickImpact: "Distributed $250K in community aid through formalized UNA structure and enhanced coordination.",
    fullStory: "james-chen",
    type: 'original'
  },
  {
    id: 'dr-aisha-patel',
    title: "Dr. Aisha Patel",
    subtitle: "Director, Community Health Collective",
    icon: <Award className="h-8 w-8" />,
    category: "Healthcare",
    keyMetrics: ["$150K grants", "Hospital partnerships", "Federal funding", "Community resource"],
    quickImpact: "Secured $150K in health grants and hospital partnerships within 6 months of UNA formation.",
    fullStory: "dr-aisha-patel",
    type: 'original'
  },
  {
    id: 'carlos-morales',
    title: "Carlos Morales",
    subtitle: "Coordinator, Worker Cooperative Alliance",
    icon: <DollarSign className="h-8 w-8" />,
    category: "Economic Development",
    keyMetrics: ["15 co-ops united", "Supplier bargaining", "Resource sharing", "Training programs"],
    quickImpact: "United 15 worker cooperatives for collective bargaining, resource sharing, and training programs.",
    fullStory: "carlos-morales",
    type: 'original'
  },
  {
    id: 'sarah-kim',
    title: "Sarah Kim",
    subtitle: "Organizer, Climate Action Network",
    icon: <Award className="h-8 w-8" />,
    category: "Environmental",
    keyMetrics: ["20+ climate actions", "Policy coordination", "Large-scale campaigns", "Credibility boost"],
    quickImpact: "Organized 20+ climate actions and gained credibility to work directly with policymakers.",
    fullStory: "sarah-kim",
    type: 'original'
  },
  {
    id: 'michael-thompson',
    title: "Michael Thompson",
    subtitle: "Founder, Community Land Trust",
    icon: <Users className="h-8 w-8" />,
    category: "Housing",
    keyMetrics: ["25 housing units", "Land ownership", "Community development", "Affordable housing"],
    quickImpact: "Developed 25 affordable housing units through collective land ownership and UNA structure.",
    fullStory: "michael-thompson",
    type: 'original'
  },
  
  // NEW 6 Case Studies (short & punchy)
  {
    id: 'stardust',
    title: "Stardust to Sovereignty",
    subtitle: "Multidimensional Consciousness & Sovereignty System",
    icon: <Palette className="h-8 w-8" />,
    category: "Creative & Cultural",
    keyMetrics: ["Multidimensional book system", "Consciousness expansion framework", "Sovereignty mapping", "Galactic intelligence integration"],
    quickImpact: "Pioneered a revolutionary UNA structure that transcends traditional business models, creating a vessel for a multidimensional consciousness expansion system that unites science, metaphysics, memory, and galactic intelligence.",
    fullStory: "stardust",
    type: 'case-study'
  },
  {
    id: 'maria-academy',
    title: "Maria's Academy",
    subtitle: "Salon & Educational Institution",
    icon: <Scissors className="h-8 w-8" />,
    category: "Education & Service",
    keyMetrics: ["Academy transformation", "Mentorship expansion", "Education grant access", "Cultural funding streams"],
    quickImpact: "Revolutionized her salon by separating business operations from educational mission, unlocking education grants and cultural funding that transformed her space into a thriving academy.",
    fullStory: "maria-academy",
    type: 'case-study'
  },
  {
    id: 'jordan-studio',
    title: "Jordan's Studio",
    subtitle: "Tattoo Artist & Community Builder",
    icon: <PenTool className="h-8 w-8" />,
    category: "Creative & Community",
    keyMetrics: ["Cultural hub status", "Artist teaching programs", "Event hosting expansion", "Community arts funding"],
    quickImpact: "Transformed a simple tattoo studio into a vibrant cultural hub that hosts events, teaches artists, and secures community arts funding while maintaining profitable business operations.",
    fullStory: "jordan-studio",
    type: 'case-study'
  },
  {
    id: 'kai-mobile',
    title: "Kai's Mobile Studio",
    subtitle: "Traveling Artist & Nature-Led Creator",
    icon: <Car className="h-8 w-8" />,
    category: "Mobile & Creative",
    keyMetrics: ["Mobile legitimacy", "Grant & residency access", "Collaboration partnerships", "Cultural recognition"],
    quickImpact: "Achieved the impossible: gained full legitimacy and funding access while preserving complete artistic freedom and mobile lifestyle - proving structure doesn't have to limit independence.",
    fullStory: "kai-mobile",
    type: 'case-study'
  },
  {
    id: 'dog-training',
    title: "Canine Community Care",
    subtitle: "Training, Rescue & Adoption",
    icon: <PawPrint className="h-8 w-8" />,
    category: "Animal Welfare & Education",
    keyMetrics: ["Rescue program expansion", "Educational funding access", "Community grant success", "Partnership growth"],
    quickImpact: "Exploded from individual training practice to comprehensive community hub, securing rescue funding, educational grants, and partnerships that transformed local animal welfare.",
    fullStory: "dog-training",
    type: 'case-study'
  },
  {
    id: 'screenwriter',
    title: "Creative Practitioner",
    subtitle: "Screenwriter & Cultural Storyteller",
    icon: <BookOpen className="h-8 w-8" />,
    category: "Creative & Cultural",
    keyMetrics: ["Workshop funding success", "Cultural grant access", "Collaboration partnerships", "Residency opportunities"],
    quickImpact: "Broke free from commercial constraints by structuring creative practice for cultural recognition, securing sustainable funding through grants and residencies while maintaining artistic integrity.",
    fullStory: "screenwriter",
    type: 'case-study'
  }
];

const caseStudies: CaseStudy[] = [
  // ORIGINAL 6 Success Stories - Detailed Case Studies
  {
    id: 'maria-rodriguez',
    title: "Maria Rodriguez — Community Gardens Pioneer",
    subtitle: "East Bay Community Gardens Network",
    icon: <Users className="h-8 w-8" />,
    category: "Community Development",
    businessType: "Community garden network expanding across multiple neighborhoods",
    challenge: "How to formalize a loose network of community gardens to secure city partnerships, grants, and expand from 3 to 12 gardens.",
    solution: "Formed UNA to create legal structure for city collaboration, grant applications, and coordinated network expansion.",
    results: [
      "Expanded from 3 to 12 community gardens in 2 years",
      "Secured city partnerships and official recognition",
      "Gained access to municipal grants and resources",
      "Created coordinated network for knowledge sharing"
    ],
    keyTakeaways: [
      "UNA provides legitimacy for city partnerships and official recognition",
      "Formal structure enables coordinated expansion and resource sharing",
      "Grants become accessible through recognized organizational status",
      "Network coordination improves through formal governance structure"
    ],
    fullStory: `Maria Rodriguez started with a simple vision: bring fresh food and community connection to her Oakland neighborhood through community gardens. What began as three small garden plots quickly grew into something much larger as neighbors saw the impact and wanted to replicate the model in their own communities.

The challenge was that Maria was operating as an informal network of passionate gardeners. While the city was supportive of the concept, they needed a formal organization to work with for partnerships, grants, and official recognition. The gardens were thriving, but the network was hitting a ceiling without proper structure.

Forming a UNA changed everything. Suddenly, Maria had the legal standing to apply for city grants, coordinate with municipal departments, and create formal partnerships. The UNA structure allowed her to hire staff, manage multiple garden sites, and create a coordinated network that could share resources, knowledge, and best practices.

Within two years, the network expanded from 3 to 12 gardens across the East Bay. The UNA structure enabled Maria to secure city partnerships, access municipal grants, and create a sustainable model that other communities could replicate. What started as grassroots gardening became a recognized community development initiative with the capacity to scale and serve more neighborhoods.`
  },
  {
    id: 'james-chen',
    title: "James Chen — Mutual Aid Network Organizer",
    subtitle: "Portland Mutual Aid Collective",
    icon: <Heart className="h-8 w-8" />,
    category: "Mutual Aid",
    businessType: "Community mutual aid network providing emergency assistance and support",
    challenge: "How to formalize mutual aid efforts to handle larger donations, open bank accounts, and coordinate effectively with other organizations.",
    solution: "Formed UNA to create legal structure for financial management, large donations, and organizational coordination.",
    results: [
      "Distributed $250K in community aid during critical periods",
      "Opened bank accounts for secure financial management",
      "Received and managed large donations effectively",
      "Coordinated with other aid organizations seamlessly"
    ],
    keyTakeaways: [
      "UNA structure enables secure financial management and large donations",
      "Formal organization improves coordination with other groups",
      "Legal status builds trust with donors and partners",
      "Structured governance improves aid distribution efficiency"
    ],
    fullStory: `James Chen's mutual aid network began as a grassroots response to community needs during the pandemic. What started as neighbors helping neighbors quickly grew into something that required more structure than informal coordination could provide. The network was distributing significant amounts of aid, but without proper legal structure, they couldn't open bank accounts, receive large donations, or coordinate effectively with other organizations.

The turning point came when a local foundation wanted to donate $50,000 to support their work. Without a formal organization, they couldn't accept such a large donation. They were also struggling to coordinate with other aid organizations, hospitals, and government agencies that needed to work with recognized entities.

Forming a UNA solved these challenges. Suddenly, James could open bank accounts, receive large donations, and create formal partnerships. The UNA structure enabled them to hire staff, coordinate volunteers, and create systems that could handle the scale of aid they were distributing.

The results were transformative. The network distributed $250,000 in community aid, coordinated with hospitals and government agencies, and created a sustainable model for ongoing mutual aid. The UNA structure gave them the capacity to handle large-scale emergencies while maintaining the grassroots, community-driven approach that made their work effective.`
  },
  {
    id: 'dr-aisha-patel',
    title: "Dr. Aisha Patel — Community Health Collective Director",
    subtitle: "Chicago Community Health Collective",
    icon: <Award className="h-8 w-8" />,
    category: "Healthcare",
    businessType: "Community health initiative providing preventive care and health education",
    challenge: "How to transform a grassroots health initiative into a recognized community resource with hospital partnerships and federal funding.",
    solution: "Formed UNA to gain legal standing for hospital partnerships, federal grants, and official recognition.",
    results: [
      "Secured $150K in federal health grants within 6 months",
      "Created formal partnerships with major hospitals",
      "Gained recognition as official community health resource",
      "Expanded services to serve more community members"
    ],
    keyTakeaways: [
      "UNA structure enables hospital and healthcare partnerships",
      "Federal grants become accessible through recognized status",
      "Official recognition improves community trust and access",
      "Formal structure enables service expansion and sustainability"
    ],
    fullStory: `Dr. Aisha Patel's community health initiative began as a grassroots effort to address health disparities in her Chicago neighborhood. She and her colleagues were providing preventive care, health education, and basic screenings, but they were hitting barriers that prevented them from scaling their impact.

The main challenges were that hospitals and healthcare systems needed to work with recognized organizations, and federal health grants required formal organizational status. While their work was valuable and community-driven, they lacked the legal standing to create the partnerships and access the funding they needed to expand.

Forming a UNA changed everything. Within six months, Dr. Patel secured $150,000 in federal health grants, created formal partnerships with major hospitals, and gained recognition as an official community health resource. The UNA structure enabled them to hire additional staff, expand their services, and create sustainable programs that could serve more community members.

The transformation was remarkable. What started as a small group of healthcare professionals volunteering their time became a recognized community health collective with the capacity to secure major funding, create institutional partnerships, and expand their impact. The UNA structure gave them the legitimacy and capacity to scale their work while maintaining their community-driven approach.`
  },
  {
    id: 'carlos-morales',
    title: "Carlos Morales — Worker Cooperative Alliance Coordinator",
    subtitle: "Austin Worker Cooperative Alliance",
    icon: <DollarSign className="h-8 w-8" />,
    category: "Economic Development",
    businessType: "Alliance of worker cooperatives for collective bargaining and resource sharing",
    challenge: "How to unite 15 worker cooperatives into a coordinated alliance for collective bargaining, resource sharing, and training programs.",
    solution: "Formed UNA to create legal structure for collective bargaining, resource coordination, and alliance governance.",
    results: [
      "United 15 worker cooperatives under coordinated alliance",
      "Achieved collective bargaining power with suppliers",
      "Created shared resource and training programs",
      "Established sustainable alliance governance structure"
    ],
    keyTakeaways: [
      "UNA enables collective bargaining power through unified structure",
      "Resource sharing becomes possible through formal coordination",
      "Training programs benefit all member co-ops through alliance",
      "Governance structure ensures sustainable collaboration"
    ],
    fullStory: `Carlos Morales saw the potential for worker cooperatives to achieve more together than they could individually. While each co-op was successful in its own right, they were missing opportunities for collective bargaining, resource sharing, and coordinated training that could benefit all members.

The challenge was that without a formal structure, the cooperatives couldn't coordinate effectively. They couldn't bargain collectively with suppliers, share expensive equipment or resources, or create training programs that benefited all members. Each co-op was operating in isolation, missing the economies of scale and collective power that could make them all stronger.

Forming a UNA created the legal and governance structure needed for the alliance to function effectively. Suddenly, the 15 cooperatives could bargain collectively with suppliers, share resources and equipment, and create coordinated training programs that benefited all members.

The results were transformative. The alliance achieved better supplier rates through collective bargaining, shared expensive equipment and resources, and created training programs that improved the skills and capacity of all member co-ops. The UNA structure enabled sustainable collaboration while preserving the autonomy and democratic governance of each individual cooperative.`
  },
  {
    id: 'sarah-kim',
    title: "Sarah Kim — Climate Action Network Organizer",
    subtitle: "Seattle Climate Action Network",
    icon: <Award className="h-8 w-8" />,
    category: "Environmental",
    businessType: "Climate activism network coordinating large-scale environmental campaigns",
    challenge: "How to give climate activism credibility and organizational capacity to coordinate large-scale campaigns and work with policymakers.",
    solution: "Formed UNA to create legal structure for campaign coordination, policy work, and organizational credibility.",
    results: [
      "Organized 20+ climate actions with coordinated impact",
      "Gained credibility to work directly with policymakers",
      "Created sustainable organizational structure for activism",
      "Improved coordination and impact of environmental campaigns"
    ],
    keyTakeaways: [
      "UNA structure provides credibility for policy work and advocacy",
      "Formal organization enables large-scale campaign coordination",
      "Legal status improves relationships with policymakers and media",
      "Structured governance improves campaign effectiveness and sustainability"
    ],
    fullStory: `Sarah Kim's climate activism began as passionate individuals coming together to address environmental challenges. While their commitment was strong, they were struggling to coordinate large-scale campaigns, work effectively with policymakers, and create the sustained impact needed to address climate change.

The main challenges were that policymakers and media outlets needed to work with recognized organizations, and large-scale campaigns required coordination and governance structures that informal groups couldn't provide. The activists were passionate and effective, but they lacked the organizational capacity to scale their impact.

Forming a UNA changed everything. Suddenly, Sarah's network had the credibility to work directly with policymakers, coordinate large-scale climate actions, and create sustainable organizational structures for ongoing activism. The UNA structure enabled them to hire staff, coordinate volunteers, and create systems that could handle the complexity of large-scale environmental campaigns.

The results were remarkable. The network organized 20+ climate actions with coordinated impact, gained credibility to work directly with policymakers, and created sustainable organizational structures for ongoing activism. The UNA structure gave them the capacity to coordinate large-scale campaigns while maintaining their grassroots, community-driven approach to environmental advocacy.`
  },
  {
    id: 'michael-thompson',
    title: "Michael Thompson — Community Land Trust Founder",
    subtitle: "Burlington Community Land Trust",
    icon: <Users className="h-8 w-8" />,
    category: "Housing",
    businessType: "Community land trust for affordable housing development",
    challenge: "How to create affordable housing through collective land ownership and community development with proper legal structure.",
    solution: "Formed UNA to create legal structure for land ownership, housing development, and community governance.",
    results: [
      "Developed 25 affordable housing units through collective ownership",
      "Created sustainable community governance structure",
      "Established model for community-driven housing development",
      "Achieved long-term affordability through land trust structure"
    ],
    keyTakeaways: [
      "UNA enables collective land ownership and housing development",
      "Community governance structure ensures long-term affordability",
      "Legal status enables partnerships with housing agencies and funders",
      "Structured approach creates sustainable affordable housing model"
    ],
    fullStory: `Michael Thompson's vision was to create affordable housing that would remain affordable in perpetuity through community ownership and collective governance. While the concept was sound, he needed a legal structure that could hold land collectively, manage housing development, and ensure long-term community control.

The challenge was that traditional housing development models didn't support collective ownership and community governance. Michael needed a structure that could hold land in trust for the community, manage the development process, and create governance systems that ensured the housing remained affordable and community-controlled over time.

Forming a UNA provided the legal and governance structure needed for the land trust to function effectively. The UNA could hold land collectively, manage the development process, and create governance systems that ensured community control and long-term affordability.

The results were transformative. The community land trust developed 25 affordable housing units, created sustainable community governance structures, and established a model for community-driven housing development that other communities could replicate. The UNA structure enabled collective land ownership while creating the governance systems needed to ensure long-term community control and affordability.`
  },

  // NEW 6 Case Studies - Detailed Narratives
  {
    id: 'stardust',
    title: "Stardust to Sovereignty — Multidimensional Consciousness System",
    subtitle: "Sovereignty & Consciousness Expansion Framework",
    icon: <Palette className="h-8 w-8" />,
    category: "Creative & Cultural",
    businessType: "Multidimensional book and interactive system for consciousness expansion and sovereignty through light, sound, memory, time, ancestral patterns, intuition, transformation, and interspecies intelligence",
    challenge: "How to create a vessel that can contain and grow a revolutionary multidimensional consciousness expansion system that unites science, metaphysics, memory, and galactic intelligence - a living framework that traditional societal constructs cannot accommodate.",
    solution: "Pioneered a revolutionary UNA structure that serves as a vessel for a multidimensional consciousness system that maps sovereignty through the languages of light, resonance, geometry, memory, intuition, and nonhuman contact.",
    results: [
      "Created a revolutionary UNA structure that transcends traditional business models",
      "Established a vessel for a multidimensional consciousness expansion system",
      "Developed a living framework that unites science, metaphysics, memory, and galactic intelligence",
      "Gained access to recognition and resourcing that matches the visionary scope"
    ],
    keyTakeaways: [
      "UNA can serve as a vessel for revolutionary consciousness expansion systems",
      "Multidimensional frameworks benefit from flexible UNA structures",
      "Galactic intelligence and sovereignty mapping require innovative organizational vessels",
      "Revolutionary consciousness systems require revolutionary organizational structures"
    ],
    fullStory: `Stardust to Sovereignty represents a visionary leap beyond traditional business models into the realm of multidimensional consciousness expansion and sovereignty. As a conscious business consultant, tech company co-founder, and practitioner of esoteric study, the founder recognized that what they were building - a revolutionary system for consciousness expansion - simply didn't fit within conventional societal constructs.

The vision encompasses a multidimensional book and interactive system that explores sovereignty and consciousness expansion through the lenses of light, sound, memory, time, ancestral patterns, intuition, transformation, and interspecies intelligence. This is a living framework that unites science, metaphysics, memory, and galactic intelligence into a structured journey of sovereignty and expanded consciousness.

Traditional business models - corporations, LLCs, nonprofits - were too rigid, too limited in scope, or too focused on single purposes. The founder needed a vessel that could grow into its full expression, accommodating a system that maps sovereignty through the languages of light, resonance, geometry, memory, intuition, and nonhuman contact without being constrained by conventional boundaries.

UNA provided that revolutionary structure. It created a vessel that could carry a multidimensional architecture that guides human awareness through the principles of light, sound, time, memory, ancestry, intuition, transformation, and advanced intelligence. The UNA structure allowed for the development of a consciousness expansion system that serves as both a business entity and a revolutionary framework for human evolution.

Through UNA, Stardust to Sovereignty gained the capacity to operate as a consciousness expansion system while simultaneously maintaining the flexibility needed for revolutionary ideas to flourish. The structure provided legitimacy and recognition while creating the space for a living framework that transcends conventional boundaries and creates new possibilities for how we understand and expand human consciousness.

This pioneering approach demonstrates that UNA can serve as a vessel for revolutionary consciousness systems that traditional structures cannot contain. It shows how multidimensional frameworks for human evolution can find expression in innovative organizational structures that transcend conventional boundaries and create new pathways for sovereignty and expanded awareness.`
  },
  {
    id: 'maria-academy',
    title: "Maria — Stylist, Mentor, and Academy Founder",
    subtitle: "Salon & Educational Institution",
    icon: <Scissors className="h-8 w-8" />,
    category: "Education & Service",
    businessType: "Salon with integrated academy and mentorship programs",
    challenge: "How to structure and fund the educational and creative components of her salon while maintaining profitable business operations.",
    solution: "Separated salon services (business) from academy activities (UNA) to access education-specific funding and partnerships.",
    results: [
      "Clear separation between business operations and educational mission",
      "Access to grants, educational partnerships, and mentorship funding",
      "Expanded teaching practice while keeping salon thriving",
      "Recognition for cultural and educational value beyond basic services"
    ],
    keyTakeaways: [
      "Distinguish between revenue-generating services and educational/cultural activities",
      "UNA structure validates educational mission and opens funding opportunities",
      "Maintain business operations separately from community/educational programs",
      "Partnerships and grants become accessible for educational components"
    ],
    fullStory: `Maria's story highlights how the presence of a school inside her salon shaped both the philosophy and the finances of her work. The academy created higher overhead costs but also created educational and artistic value that could be distinguished from day‑to‑day salon services. Through UNA, Maria was able to recognize and structure the educational and creative components of her salon correctly. This included apprenticeships, mentorship, collaborative learning, and even hair shows and events hosted in the studio. UNA helped her separate the regular business operations of the salon from the academy and its cultural activities, giving her access to grants, partnerships, and funding that specifically support education and creative development.

Maria began as a stylist working with clients in her community. Over time, she created an academy where apprentices learn from mentors and where craft and teaching live together. Her salon became both a business and a school.

Through UNA, Maria identified how to structure her work correctly. The salon services continued as a straightforward business, while the academy with its mentorship, collaborative learning, and educational mission aligned with UNA. This gave her clarity about what belonged in each container.

UNA also created new financial opportunities. With her academy structured as a UNA, Maria became eligible for grants, educational partnerships, and mentorship funding. She could expand her teaching practice while keeping her salon thriving, each held in the right form.`
  },
  {
    id: 'jordan-studio',
    title: "Jordan — Tattoo Artist, Teacher, and Community Builder",
    subtitle: "Cultural Studio & Event Hub",
    icon: <PenTool className="h-8 w-8" />,
    category: "Creative & Community",
    businessType: "Tattoo studio expanded into cultural and educational space",
    challenge: "How to manage the overhead of maintaining a studio that serves as service space, educational environment, and event hub while accessing appropriate funding.",
    solution: "Kept tattoo services as personal business while structuring teaching, events, and community activities under UNA for cultural funding access.",
    results: [
      "Clear distinction between service business and cultural activities",
      "Access to community arts grants and wellness/education funding",
      "Recognition for community-building aspects of the studio",
      "Positioned to grow into supported cultural hub"
    ],
    keyTakeaways: [
      "Separate revenue-generating services from community/cultural activities",
      "UNA structure validates community-building mission",
      "Cultural and educational activities gain funding access",
      "Studio becomes recognized cultural hub with financial support"
    ],
    fullStory: `Jordan's studio is a cultural space with many layers. It hosts events, teaches nonviolent communication to artists, includes an apprentice, and extends into a garden for gatherings. The studio collaborates with makers and artists to showcase and sell work. Beyond tattooing, it is a place of teaching, collaboration, and community cultivation.

The overhead of maintaining a studio that is at once a service space, an educational environment, and an event hub presented challenges. UNA allowed Jordan to hold these different aspects together with clarity. The tattoo service remained a personal business, while the teaching, events, garden, and collaborations found coherence in a UNA structure.

This distinction created both philosophical alignment and financial benefit. As a UNA, Jordan could apply for community arts grants, wellness and education funding, and collaborative cultural projects. The framework gave recognition to the community-building aspects of the studio, created legitimacy for partnerships, and positioned the studio to grow into a cultural hub supported by both creative practice and financial resources.`
  },
  {
    id: 'kai-mobile',
    title: "Kai — Traveling Artist and Nature-Led Creator",
    subtitle: "Mobile Creative Practice",
    icon: <Car className="h-8 w-8" />,
    category: "Mobile & Creative",
    businessType: "Mobile artist living and creating in van while traveling",
    challenge: "How to maintain financial and collaborative structure while living a mobile lifestyle that requires flexibility and independence.",
    solution: "UNA provided recognition and structure for financial management, collaboration, and grant access while preserving mobility and independence.",
    results: [
      "Legitimate entity recognition for financial and collaborative needs",
      "Access to grants, residencies, and cultural programs",
      "Maintained independence and mobile lifestyle",
      "Bridge between personal calling and community contribution"
    ],
    keyTakeaways: [
      "UNA can support mobile and flexible lifestyles",
      "Structure doesn't have to limit independence",
      "Grants and residencies become accessible",
      "Creative practice gains legitimacy and support"
    ],
    fullStory: `Kai lives and creates in her van, which is both home and studio. She moves through landscapes that inspire her art, and her livelihood depends on the ability to create and sell while staying mobile. The mobility brings inspiration but also requires a structure that can support financial and collaborative needs.

UNA provided that structure. It gave her recognition to open accounts, manage finances, and collaborate with partners, all while continuing to live on the move. It also created the possibility to apply for grants, residencies, and cultural programs that require a recognized entity. With this, Kai's creative life was seen as legitimate, supported, and sustainable.

Philosophically UNA honored her independence. Fiscally it allowed her to be resourced as seriously as a traditional studio, while still protecting her freedom to follow inspiration into new places. It created a bridge between her art as a personal calling and her art as a community and cultural contribution.`
  },
  {
    id: 'dog-training',
    title: "Dog Training, Rescue, and Community Care",
    subtitle: "Comprehensive Canine Practice",
    icon: <PawPrint className="h-8 w-8" />,
    category: "Animal Welfare & Education",
    businessType: "Dog training practice expanded into rescue, foster, and adoption programs",
    challenge: "How to manage the complexity and costs of expanding from individual training into comprehensive community programs including rescue and adoption.",
    solution: "Structured training, rescue, adoption, and educational programs under UNA while keeping boarding and walking as service business.",
    results: [
      "Clear structure for community-oriented programs",
      "Access to animal welfare grants and rescue funding",
      "Legitimate framework for donations and partnerships",
      "Recognized community hub with financial sustainability"
    ],
    keyTakeaways: [
      "Separate service activities from community programs",
      "UNA validates community mission and opens funding",
      "Partnerships and donations become accessible",
      "Individual practice grows into supported community hub"
    ],
    fullStory: `A trainer begins with obedience lessons and gradually builds a comprehensive canine practice: agility courses, breed-specific training, socialization work, and behavioral coaching. The practice expands into connected services like walking, boarding, and sitting. Over time, the vision grows to include rescue, foster, and adoption programs. Dogs are trained and socialized for new families, fosters are supported with resources, and adoption events connect the community. This expansion brought higher costs and more complexity, which made it difficult to manage as a simple service business.

Through UNA, the trainer can hold this full ecosystem with clarity. The boarding and walking remain straightforward service activities, while the training, rescue, adoption, and educational programs find coherence as the UNA core. This made the community-oriented aspects legible and recognizable, and also created the fiscal pathway for sustainability.

UNA affirms the vision of dogs as integral to community life. It opens access to animal welfare grants, rescue and adoption funding, educational support for training programs, and community recreation funds. It creates a legitimate framework to receive donations, build partnerships with shelters, and engage apprentices or assistants under clear agreements. What began as an individual training practice becomes a recognized community hub, with both the philosophy and the financial resources to sustain and expand its mission.`
  },
  {
    id: 'screenwriter',
    title: "Screenwriter as Creative Practitioner",
    subtitle: "Cultural Storytelling & Community Collaboration",
    icon: <BookOpen className="h-8 w-8" />,
    category: "Creative & Cultural",
    businessType: "Screenwriter developing cultural narrative through workshops and collaboration",
    challenge: "How to structure creative practice for sustainable funding while maintaining artistic independence and community collaboration.",
    solution: "UNA structure for workshops, mentorship, and collaborative sessions while keeping commercial contracts separate.",
    results: [
      "Access to grants, residencies, and cultural funding",
      "Sustainable creative process without waiting for commercial contracts",
      "Recognition for writing as cultural art form",
      "Bridge between personal practice and community contribution"
    ],
    keyTakeaways: [
      "Separate commercial contracts from creative development",
      "UNA validates creative practice as cultural work",
      "Grants and residencies become accessible",
      "Solitary practice becomes supported creative path"
    ],
    fullStory: `An author is developing a screenplay as a form of cultural storytelling. She participates in workshops, invites community input, and collaborates with other artists. The project is not only about finishing a script, it is about shaping a narrative that speaks to shared human experience.

UNA provides a way to structure this creative practice. The UNA holds the workshops, mentorship, and collaborative sessions as its core. These are recognized as educational and cultural activities, which qualify for support.

By viewing her writing as a creative endeavor, the author gains access to grants, residencies, and cultural funding that sustain her process. Book royalties or commercial studio contracts remain separate, but the developmental, collaborative, and cultural aspects are resourced within the UNA.

For her, UNA is both philosophical and fiscal alignment. It validates writing as an art form that deserves recognition, and it creates the fiscal bridge that allows her to keep writing without waiting for commercial contracts. UNA turns a solitary practice into a supported creative path.`
  }
];

export default function Success() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'All Stories', count: successStories.length },
    { id: 'Community Development', name: 'Community Development', count: 2 },
    { id: 'Creative & Cultural', name: 'Creative & Cultural', count: 3 },
    { id: 'Mutual Aid', name: 'Mutual Aid', count: 1 },
    { id: 'Healthcare', name: 'Healthcare', count: 1 },
    { id: 'Economic Development', name: 'Economic Development', count: 1 },
    { id: 'Environmental', name: 'Environmental', count: 1 },
    { id: 'Housing', name: 'Housing', count: 1 },
    { id: 'Education & Service', name: 'Education & Service', count: 1 },
    { id: 'Mobile & Creative', name: 'Mobile & Creative', count: 1 },
    { id: 'Animal Welfare & Education', name: 'Animal Welfare & Education', count: 1 }
  ];

  const filteredStories = successStories.filter(story => 
    selectedCategory === 'all' || story.category === selectedCategory
  );

  const openCaseStudy = (storyId: string) => {
    const caseStudy = caseStudies.find(cs => cs.id === storyId);
    if (caseStudy) {
      setSelectedCaseStudy(caseStudy);
      setIsCaseStudyOpen(true);
    }
  };

  const closeCaseStudy = () => {
    setIsCaseStudyOpen(false);
    setSelectedCaseStudy(null);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-navy-900 mb-6">
            Success Stories & Case Studies
          </h1>
          <p className="text-xl text-navy-600 max-w-3xl mx-auto">
            Discover how UNAs are transforming diverse businesses, creative practices, and community initiatives. 
            Get inspired by 12 real stories, then dive deeper into detailed case studies.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-navy-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gold-600 text-white'
                    : 'bg-navy-200 text-navy-700 hover:bg-navy-300'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Success Stories Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStories.map((story) => (
            <div key={story.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {/* Header */}
              <div className="p-6 border-b border-navy-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-gold-600">
                    {story.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-navy-900">{story.title}</h3>
                    <p className="text-sm text-navy-600">{story.subtitle}</p>
                  </div>
                </div>
                <span className="inline-block px-2 py-1 text-xs font-medium bg-gold-100 text-gold-800 rounded-full">
                  {story.category}
                </span>
              </div>

              {/* Key Metrics */}
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-navy-900 mb-2">Key Achievements</h4>
                  <ul className="space-y-1">
                    {story.keyMetrics.map((metric, index) => (
                      <li key={index} className="text-sm text-navy-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2"></div>
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Impact */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-navy-900 mb-2">Quick Impact</h4>
                  <p className="text-sm text-navy-600">{story.quickImpact}</p>
                </div>

                {/* Read Full Story Button */}
                <button
                  onClick={() => openCaseStudy(story.id)}
                  className="w-full bg-gold-600 text-white py-2 px-4 rounded-lg hover:bg-gold-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Read the Full Story</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Case Study Modal */}
      {isCaseStudyOpen && selectedCaseStudy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-navy-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-gold-600">
                    {selectedCaseStudy.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-navy-900">{selectedCaseStudy.title}</h2>
                    <p className="text-lg text-navy-600">{selectedCaseStudy.subtitle}</p>
                  </div>
                </div>
                <button
                  onClick={closeCaseStudy}
                  className="text-navy-400 hover:text-navy-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Business Overview */}
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Business Overview</h3>
                <p className="text-navy-600">{selectedCaseStudy.businessType}</p>
              </div>

              {/* Challenge */}
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">The Challenge</h3>
                <p className="text-navy-600">{selectedCaseStudy.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">The UNA Solution</h3>
                <p className="text-navy-600">{selectedCaseStudy.solution}</p>
              </div>

              {/* Results */}
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Results & Impact</h3>
                <ul className="space-y-2">
                  {selectedCaseStudy.results.map((result, index) => (
                    <li key={index} className="text-navy-600 flex items-start">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Takeaways */}
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">Key Takeaways</h3>
                <ul className="space-y-2">
                  {selectedCaseStudy.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="text-navy-600 flex items-start">
                      <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                      {takeaway}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Story */}
              <div>
                <h3 className="text-lg font-semibold text-navy-900 mb-2">The Full Story</h3>
                <div className="text-navy-600 leading-relaxed whitespace-pre-line">
                  {selectedCaseStudy.fullStory}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-navy-200 bg-navy-50">
              <div className="flex justify-between items-center">
                <span className="text-sm text-navy-500">
                  Ready to start your own UNA journey?
                </span>
                <Link
                  to="/services"
                  onClick={closeCaseStudy}
                  className="bg-gold-600 text-white py-2 px-6 rounded-lg hover:bg-gold-700 transition-colors duration-200"
                >
                  Book Strategy Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
