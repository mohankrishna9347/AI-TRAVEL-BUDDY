export const SelectTravelList = [
    {
      id: 1,
      title: 'Just Me',
      desc: 'A sole traveler in exploration',
      icon: '✈️',  // Flight icon emoji
      people: '1',
    },
    {
      id: 2,
      title: 'Couple Getaway',
      desc: 'A romantic escape for two',
      icon: '💑',  // Couple emoji
      people: '2',
    },
    {
      id: 3,
      title: 'Family Vacation',
      desc: 'A fun trip for the whole family',
      icon: '👨‍👩‍👧‍👦',  // Family emoji
      people: '4+',
    },
    {
      id: 4,
      title: 'Group Adventure',
      desc: 'A thrilling experience with friends',
      icon: '👯‍♂️',  // Group emoji
      people: '5+',
    },
  ];
  
  export const SelectBudgetOptions = [
    {
      id: 1,
      title: 'Cheap',
      desc: 'Stay conscious of costs',
      icon: '💸',  // Money with wings emoji to represent budget-conscious travel
    },
    {
      id: 2,
      title: 'Mid-Range',
      desc: 'Comfort with a reasonable budget',
      icon: '💼',  // Briefcase emoji to represent a more balanced budget
    },
    {
      id: 3,
      title: 'Luxury',
      desc: 'Experience premium travel with top amenities',
      icon: '💎',  // Gem emoji to represent high-end luxury
    },
    {
      id: 4,
      title: 'All-Inclusive',
      desc: 'Everything included for a stress-free experience',
      icon: '🍽️',  // Plate with fork and knife emoji to symbolize all-inclusive dining and services
    },
  ]

  export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget}, 
  give me Hotels options list with HotelName, Hotel Address, Price, Hotel Image URL, GEO Coordinates, Ticket Pricing, Rating, 
  Time travel each of the location for {totalDays} days with each day's plan with best time to visit in JSON Format.`;
  
  