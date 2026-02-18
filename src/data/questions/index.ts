import type { QuestionData } from "@/lib/questions";

export const questions: QuestionData[] = [
  // ============ LIFESTYLE QUESTIONS ============
  {
    id: "coffee-preference",
    title: {
      ko: "아침에 커피를 마시는 것을 좋아한다",
      en: "I enjoy having coffee in the morning",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 64,
    source: {
      name: "National Coffee Association",
      url: "https://www.ncausa.org/",
      year: 2023,
    },
    insight: {
      ko: "64%의 성인이 매일 커피를 마십니다. 커피는 세계에서 가장 인기 있는 음료 중 하나입니다.",
      en: "64% of adults drink coffee daily. Coffee is one of the most popular beverages worldwide.",
    },
    detailedInsight: {
      ko: "커피는 단순한 음료를 넘어 사회적 의식이 되었습니다. 흥미롭게도, 커피 소비량은 국가 GDP와 양의 상관관계를 보입니다. 북유럽 국가들이 1인당 커피 소비량 1위를 차지하고 있으며, 이는 추운 기후와 긴 근무 시간 문화와 연관됩니다.",
      en: "Coffee has become more than a beverage—it's a social ritual. Interestingly, coffee consumption correlates positively with national GDP. Nordic countries lead in per-capita coffee consumption, linked to cold climates and long working hour cultures.",
    },
    category: "lifestyle",
  },
  {
    id: "weekend-rest",
    title: {
      ko: "주말에는 집에서 쉬는 것이 좋다",
      en: "I prefer staying home to rest on weekends",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 58,
    source: {
      name: "Pew Research",
      url: "https://www.pewresearch.org/",
      year: 2023,
    },
    insight: {
      ko: "58%의 사람들이 주말에 집에서 휴식을 선호합니다. 외향적인 사람만 있는 것은 아닙니다.",
      en: "58% prefer resting at home on weekends. Not everyone is an extrovert.",
    },
    detailedInsight: {
      ko: "소셜 미디어는 '활동적인 주말'을 과대 표현합니다. 여행, 파티, 모임 사진이 피드를 가득 채우지만, 실제로 대부분의 사람들은 조용한 휴식을 선호합니다. 이것이 '소셜 미디어 편향'입니다. 우리는 '평범한 주말'을 공유하지 않기 때문에 다른 사람들이 더 활동적이라고 착각합니다.",
      en: "Social media over-represents 'active weekends.' Travel, parties, and gatherings fill our feeds, but most people actually prefer quiet rest. This is 'social media bias'—we don't share 'ordinary weekends,' so we assume others are more active than they are.",
    },
    category: "lifestyle",
  },

  // ============ SOCIAL QUESTIONS ============
  {
    id: "same-sex-marriage",
    title: {
      ko: "동성결혼을 법적으로 인정해야 한다",
      en: "Same-sex marriage should be legally recognized",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 71,
    source: {
      name: "Gallup",
      url: "https://news.gallup.com/poll/393197/same-sex-marriage-support-inches-new-high.aspx",
      year: 2022,
    },
    insight: {
      ko: "미국에서 동성결혼 지지율은 71%로 역대 최고치입니다. 많은 사람들이 '반대가 더 많을 것'이라고 생각하지만, 실제로는 대다수가 지지합니다.",
      en: "Support for same-sex marriage in the US reached a record high of 71%. Many assume opposition is greater, but the majority actually supports it.",
    },
    detailedInsight: {
      ko: "1996년 동성결혼 지지율은 27%에 불과했습니다. 25년 만에 71%로 상승한 것은 역사상 가장 빠른 여론 변화 중 하나입니다. 특히 주목할 점은 공화당 지지자 중에서도 55%가 지지한다는 것입니다. 그러나 반대 의견이 더 '목소리가 크기' 때문에 실제 지지율보다 반대가 많다고 착각하게 됩니다.",
      en: "In 1996, only 27% supported same-sex marriage. Rising to 71% in 25 years is one of the fastest opinion shifts in history. Notably, 55% of Republicans now support it. However, opposition tends to be 'louder,' creating the illusion that there's more resistance than actually exists.",
    },
    category: "social",
  },
  {
    id: "climate-concern",
    title: {
      ko: "기후변화는 심각한 위협이다",
      en: "Climate change is a serious threat",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 72,
    source: {
      name: "Yale Climate Communication",
      url: "https://climatecommunication.yale.edu/publications/climate-change-in-the-american-mind/",
      year: 2023,
    },
    insight: {
      ko: "미국인의 72%가 지구온난화가 일어나고 있다고 믿습니다. '기후변화 회의론자가 많다'는 인식과 달리, 대부분의 사람들은 기후변화를 인정합니다.",
      en: "72% of Americans believe global warming is happening. Despite the perception that climate skeptics are common, most people acknowledge climate change.",
    },
    detailedInsight: {
      ko: "Yale의 연구에 따르면, 기후변화를 걱정하는 사람들 중 64%가 '다른 사람들과 이 주제로 거의 대화하지 않는다'고 답했습니다. 이것이 '침묵의 나선' 효과입니다. 기후변화에 대해 말하는 것이 불편하거나 논쟁을 피하고 싶어서 침묵하지만, 실제로는 대부분이 같은 생각을 합니다. 우리의 침묵이 회의론자들의 목소리를 더 크게 만듭니다.",
      en: "Yale's research shows 64% of those concerned about climate change 'rarely or never talk about it.' This is the 'spiral of silence' effect. We stay quiet to avoid discomfort or arguments, but most people actually share the same concern. Our silence amplifies skeptics' voices.",
    },
    category: "social",
  },
  {
    id: "immigration-positive",
    title: {
      ko: "이민은 국가 경제에 긍정적인 영향을 준다",
      en: "Immigration has a positive impact on the national economy",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 59,
    source: {
      name: "Pew Research Center",
      url: "https://www.pewresearch.org/short-reads/2024/04/09/americans-views-of-immigrants/",
      year: 2024,
    },
    insight: {
      ko: "미국인의 59%가 이민자들이 경제에 긍정적 영향을 준다고 생각합니다. 미디어의 반이민 보도가 많지만, 과반수는 이민의 경제적 가치를 인정합니다.",
      en: "59% of Americans believe immigrants positively impact the economy. Despite heavy anti-immigration media coverage, the majority recognizes the economic value of immigration.",
    },
    detailedInsight: {
      ko: "뉴스 미디어는 이민 관련 부정적 사건을 더 많이 보도하는 경향이 있습니다. 이는 '부정성 편향' 때문입니다. 부정적 뉴스가 더 많은 클릭과 시청률을 만들기 때문입니다. 그러나 경제학자들의 연구에 따르면 이민은 일자리를 빼앗기보다 새로운 일자리를 창출하고, 기업가 정신을 통해 혁신을 이끄는 경우가 많습니다.",
      en: "News media tends to cover negative immigration stories more frequently due to 'negativity bias'—negative news generates more clicks and views. However, economists' research shows immigration often creates new jobs rather than taking them away, and drives innovation through entrepreneurship.",
    },
    category: "social",
  },
  {
    id: "mental-health-support",
    title: {
      ko: "정신건강 문제로 전문가 도움을 받는 것은 부끄러운 일이 아니다",
      en: "Seeking professional help for mental health is not something to be ashamed of",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 87,
    source: {
      name: "American Psychological Association",
      url: "https://www.apa.org/news/press/releases/2019/05/mental-health-survey",
      year: 2023,
    },
    insight: {
      ko: "87%가 정신건강 전문가 상담이 부끄러운 일이 아니라고 생각합니다. 그럼에도 많은 사람들이 '남들이 어떻게 볼까' 걱정에 상담을 미룹니다.",
      en: "87% believe seeking mental health help isn't shameful. Yet many delay seeking help, worrying about others' perceptions.",
    },
    detailedInsight: {
      ko: "여기에 아이러니가 있습니다. 거의 모든 사람(87%)이 '정신건강 상담은 부끄럽지 않다'고 생각하면서도, 정작 자신이 도움을 받으려 할 때는 '다른 사람들이 이상하게 볼 것'이라고 걱정합니다. 이것이 전형적인 집단 착각입니다. 우리 모두가 서로를 잘못 추정하고 있습니다. 실제로 당신이 상담을 받는다고 하면, 주변 87%는 그것을 긍정적으로 볼 것입니다.",
      en: "Here's the irony: nearly everyone (87%) thinks 'mental health counseling isn't shameful,' yet when considering it themselves, they worry 'others will judge me.' This is classic collective illusion. We're all misjudging each other. In reality, 87% around you would view your decision positively.",
    },
    category: "social",
  },

  // ============ VALUES QUESTIONS ============
  {
    id: "money-vs-meaning",
    title: {
      ko: "돈보다 일의 의미가 더 중요하다",
      en: "Meaning in work matters more than money",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 67,
    source: {
      name: "World Values Survey",
      url: "https://www.worldvaluessurvey.org/",
      year: 2022,
    },
    insight: {
      ko: "전 세계적으로 67%의 사람들이 일에서 의미를 중요하게 생각합니다. '모두가 돈만 쫓는다'는 것은 착각입니다.",
      en: "Globally, 67% of people value meaning in their work. The belief that 'everyone just chases money' is an illusion.",
    },
    detailedInsight: {
      ko: "팬데믹 이후 이 수치는 더 높아졌습니다. '대퇴직(Great Resignation)' 현상의 핵심 원인 중 하나는 급여가 아닌 '일의 의미 부재'였습니다. 그러나 우리는 여전히 동료들이 '돈 때문에' 일한다고 가정합니다. 이런 착각은 조직 문화를 왜곡시킵니다. 리더들이 '돈만 주면 된다'고 생각하게 만들기 때문입니다.",
      en: "Post-pandemic, this number has risen further. A key driver of the 'Great Resignation' wasn't salary—it was lack of meaning. Yet we still assume colleagues work 'just for money.' This illusion distorts organizational culture, leading leaders to think 'just pay more' is the solution.",
    },
    category: "values",
  },
  {
    id: "work-life-balance",
    title: {
      ko: "일과 삶의 균형이 승진보다 중요하다",
      en: "Work-life balance is more important than promotion",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 73,
    source: {
      name: "Microsoft Work Trend Index",
      url: "https://www.microsoft.com/en-us/worklab/work-trend-index",
      year: 2023,
    },
    insight: {
      ko: "73%가 승진보다 일과 삶의 균형을 중시합니다. '커리어 욕심이 없으면 뒤처진다'는 생각은 착각입니다.",
      en: "73% prioritize work-life balance over promotion. The belief that 'lacking career ambition means falling behind' is an illusion.",
    },
    detailedInsight: {
      ko: "흥미로운 점은 이 73%의 사람들 대부분이 '다른 동료들은 승진을 더 중요시할 것'이라고 생각한다는 것입니다. 그래서 야근하고, 휴가를 못 쓰고, 번아웃에 시달립니다. 모두가 서로를 의식하며 '경쟁'하지만, 실제로 대부분은 같은 바람을 갖고 있습니다. 누군가 먼저 '균형'을 말하면, 나머지도 편하게 동의할 수 있습니다.",
      en: "Interestingly, most of this 73% think 'my colleagues prioritize promotion more.' So they work overtime, skip vacations, and suffer burnout. Everyone competes while watching each other, but most share the same wish. When someone speaks up about 'balance' first, others can comfortably agree.",
    },
    category: "values",
  },
  {
    id: "honesty-over-success",
    title: {
      ko: "성공보다 정직하게 사는 것이 더 중요하다",
      en: "Living honestly is more important than being successful",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 81,
    source: {
      name: "World Values Survey",
      url: "https://www.worldvaluessurvey.org/",
      year: 2022,
    },
    insight: {
      ko: "81%가 성공보다 정직을 더 중요시합니다. '세상이 각박하다'고 느끼지만, 대부분의 사람들은 여전히 정직을 우선시합니다.",
      en: "81% value honesty over success. We feel 'the world is cutthroat,' but most people still prioritize honesty.",
    },
    detailedInsight: {
      ko: "미디어는 성공 스토리와 스캔들을 집중 보도합니다. '정직하게 평범하게 사는 사람들'은 뉴스가 되지 않습니다. 이로 인해 우리는 '성공을 위해 수단과 방법을 가리지 않는 사람들'이 더 많다고 착각하게 됩니다. 그러나 조용한 다수는 여전히 정직을 핵심 가치로 삼고 있습니다. 시끄러운 소수가 만드는 환상에 속지 마세요.",
      en: "Media focuses on success stories and scandals. 'People living honestly and ordinarily' don't make news. This makes us think there are more 'people who'll do anything for success.' But the silent majority still holds honesty as a core value. Don't be fooled by the illusion created by the loud minority.",
    },
    category: "values",
  },
  {
    id: "helping-strangers",
    title: {
      ko: "낯선 사람을 돕는 것은 당연한 일이다",
      en: "Helping strangers is a natural thing to do",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 76,
    source: {
      name: "Charities Aid Foundation - World Giving Index",
      url: "https://www.cafonline.org/about-us/publications/2023-publications/caf-world-giving-index-2023",
      year: 2023,
    },
    insight: {
      ko: "전 세계 76%가 지난 달 낯선 사람을 도왔습니다. '사람들은 이기적이다'라는 믿음과 달리, 대부분은 기꺼이 타인을 돕습니다.",
      en: "76% worldwide helped a stranger last month. Despite the belief that 'people are selfish,' most are willing to help others.",
    },
    detailedInsight: {
      ko: "이 통계는 특히 놀랍습니다. '현대 사회는 개인주의적이다', '사람들이 냉정해졌다'는 통념과 정반대이기 때문입니다. 실제로 자선 기부, 자원봉사, 일상적 친절 행위는 계속 증가하고 있습니다. 우리가 '냉정한 세상'이라고 느끼는 이유는 뉴스가 부정적 사건을 더 많이 보도하고, 친절한 행위는 '당연한 것'으로 여겨져 보도되지 않기 때문입니다.",
      en: "This statistic is especially surprising because it contradicts common beliefs like 'modern society is individualistic' and 'people have become cold.' In reality, charitable giving, volunteering, and everyday kindness are all increasing. We feel the 'world is cold' because news covers negative events more, while kind acts are seen as 'normal' and go unreported.",
    },
    category: "values",
  },

  // ============ POLITICAL QUESTIONS ============
  {
    id: "political-dialogue",
    title: {
      ko: "정치적으로 다른 의견을 가진 사람과 대화할 의향이 있다",
      en: "Willing to have conversations with people of different political views",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 77,
    source: {
      name: "More in Common",
      url: "https://www.moreincommon.com/hidden-tribes/",
      year: 2018,
    },
    insight: {
      ko: "77%의 사람들이 다른 정치적 견해를 가진 사람들과 대화할 의향이 있습니다. 정치적 양극화는 실제보다 과장되어 있습니다.",
      en: "77% of people are willing to talk with those of different political views. Political polarization is more exaggerated than real.",
    },
    detailedInsight: {
      ko: "'More in Common' 연구는 '숨겨진 부족들(Hidden Tribes)'을 발견했습니다. 미국인의 67%는 '지친 다수(Exhausted Majority)'에 속합니다. 이들은 극단적이지 않고, 타협과 대화를 원합니다. 그러나 소셜 미디어와 뉴스에서는 양 극단(14%에 불과)의 목소리가 80% 이상을 차지합니다. 우리는 '시끄러운 극단'을 '모두의 의견'으로 착각하고 있습니다.",
      en: "'More in Common' research discovered 'Hidden Tribes.' 67% of Americans belong to the 'Exhausted Majority'—not extreme, wanting compromise and dialogue. Yet on social media and news, the extreme voices (only 14%) make up 80%+ of content. We mistake the 'loud extremes' for 'everyone's opinion.'",
    },
    category: "political",
  },
  {
    id: "democracy-support",
    title: {
      ko: "민주주의는 가장 좋은 정치 체제이다",
      en: "Democracy is the best political system",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 68,
    source: {
      name: "Pew Research Center",
      url: "https://www.pewresearch.org/global/2024/02/28/representative-democracy-remains-a-popular-ideal/",
      year: 2024,
    },
    insight: {
      ko: "전 세계 68%가 민주주의를 지지합니다. 권위주의 체제가 확산된다는 뉴스와 달리, 대다수 시민들은 여전히 민주주의를 선호합니다.",
      en: "68% globally support democracy. Despite news about spreading authoritarianism, most citizens still prefer democracy.",
    },
    detailedInsight: {
      ko: "민주주의에 대한 불만이 높아졌다는 뉴스가 많지만, 이것은 '민주주의 자체에 대한 거부'가 아니라 '현재 민주주의 작동 방식에 대한 불만'입니다. 같은 조사에서 사람들은 '더 나은 민주주의'를 원한다고 답했습니다. 권위주의를 원하는 사람은 극소수입니다. 불만의 목소리가 크다고 해서 민주주의 지지가 무너진 것이 아닙니다.",
      en: "While dissatisfaction with democracy makes headlines, this isn't 'rejection of democracy itself' but 'frustration with how democracy currently works.' The same surveys show people want 'better democracy.' Very few actually want authoritarianism. Loud complaints don't mean democratic support has collapsed.",
    },
    category: "political",
  },
  {
    id: "political-common-ground",
    title: {
      ko: "보수와 진보는 공통점보다 차이점이 더 많다",
      en: "Conservatives and liberals have more differences than commonalities",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 45,
    source: {
      name: "More in Common - Perception Gap Study",
      url: "https://perceptiongap.us/",
      year: 2019,
    },
    insight: {
      ko: "실제로는 45%만 이렇게 생각합니다. 정치적 차이는 실제보다 과장되어 인식됩니다. 대부분의 사람들은 기본적인 가치에서 더 많은 공통점을 가지고 있습니다.",
      en: "Only 45% actually think this way. Political differences are perceived as greater than they are. Most people share more common ground on fundamental values.",
    },
    detailedInsight: {
      ko: "'인식 격차(Perception Gap)' 연구에 따르면, 민주당원은 공화당원의 실제 입장보다 2배 더 극단적으로 추정하고, 공화당원도 민주당원에 대해 마찬가지입니다. 뉴스를 더 많이 보는 사람일수록 이 '인식 격차'가 더 큽니다. 아이러니하게도 '정보를 많이 접하는 사람'이 더 잘못된 인식을 갖게 됩니다. 미디어가 극단적 목소리를 증폭시키기 때문입니다.",
      en: "The 'Perception Gap' study found Democrats estimate Republicans' positions 2x more extreme than reality, and vice versa. Those who consume more news have larger 'perception gaps.' Ironically, 'more informed' people develop more distorted perceptions because media amplifies extreme voices.",
    },
    category: "political",
  },

  // ============ WORKPLACE QUESTIONS ============
  {
    id: "workplace-voice",
    title: {
      ko: "직장에서 자신의 의견을 솔직하게 말하기 어렵다",
      en: "It's difficult to speak up honestly at work",
    },
    description: {
      ko: "이렇게 느끼는 사람은 몇 %일까요?",
      en: "What percentage of people feel this way?",
    },
    actualPercentage: 53,
    source: {
      name: "Gallup",
      url: "https://www.gallup.com/workplace/236198/create-culture-psychological-safety.aspx",
      year: 2023,
    },
    insight: {
      ko: "53%의 직원들이 직장에서 솔직하게 말하기 어렵다고 느낍니다. '나만 그런 게 아닙니다' - 침묵의 나선은 실재합니다.",
      en: "53% of employees find it hard to speak up at work. You're not alone - the spiral of silence is real.",
    },
    detailedInsight: {
      ko: "Google의 '아리스토텔레스 프로젝트' 연구에 따르면, 고성과 팀의 가장 중요한 특성은 '심리적 안전감'입니다. 구성원들이 실수나 반대 의견을 말해도 처벌받지 않는다는 확신입니다. 그러나 많은 조직에서 직원들은 '다른 사람들은 괜찮은데 나만 불편한 것'이라고 생각합니다. 실제로는 과반수가 같은 어려움을 겪고 있습니다.",
      en: "Google's 'Project Aristotle' found the most important trait of high-performing teams is 'psychological safety'—the belief that you won't be punished for mistakes or dissent. Yet in many organizations, employees think 'others are fine, only I'm uncomfortable.' In reality, over half face the same difficulty.",
    },
    category: "workplace",
  },
  {
    id: "remote-work-preference",
    title: {
      ko: "재택근무가 사무실 근무보다 더 효율적이다",
      en: "Remote work is more efficient than office work",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 62,
    source: {
      name: "McKinsey - American Opportunity Survey",
      url: "https://www.mckinsey.com/industries/real-estate/our-insights/americans-are-embracing-flexible-work-and-they-want-more-of-it",
      year: 2023,
    },
    insight: {
      ko: "62%가 재택근무를 더 효율적이라고 생각합니다. 그러나 많은 사람들이 '나만 재택을 원하는 것 같다'고 느껴 사무실 복귀 정책에 조용히 따릅니다.",
      en: "62% find remote work more efficient. Yet many feel 'I'm the only one who wants remote work' and quietly comply with return-to-office policies.",
    },
    detailedInsight: {
      ko: "이것이 집단 착각의 전형적인 예입니다. 62%가 재택근무를 선호하면서도, '분위기상' 또는 '상사 눈치 때문에' 사무실로 출근합니다. 각자 '다른 사람들은 사무실을 원하는 것 같다'고 생각하지만, 실제로는 다수가 유연근무를 원합니다. 누군가 먼저 목소리를 내면 많은 사람들이 동의할 준비가 되어 있습니다.",
      en: "This is a classic collective illusion. 62% prefer remote work, yet come to offices due to 'atmosphere' or 'boss expectations.' Each thinks 'others seem to want office work,' but the majority actually wants flexibility. Many are ready to agree once someone speaks up first.",
    },
    category: "workplace",
  },
  {
    id: "workplace-mistakes",
    title: {
      ko: "실수를 인정하면 직장에서 불이익을 받을 것이다",
      en: "Admitting mistakes will lead to negative consequences at work",
    },
    description: {
      ko: "이렇게 느끼는 사람은 몇 %일까요?",
      en: "What percentage of people feel this way?",
    },
    actualPercentage: 49,
    source: {
      name: "Harvard Business Review - Psychological Safety Research",
      url: "https://hbr.org/2023/02/what-is-psychological-safety",
      year: 2023,
    },
    insight: {
      ko: "49%가 실수 인정에 대한 두려움을 느끼지만, 나머지 51%는 실수를 학습 기회로 봅니다. 당신의 조직에서도 '실수해도 괜찮다'고 생각하는 사람이 더 많을 수 있습니다.",
      en: "49% fear admitting mistakes, but 51% see mistakes as learning opportunities. In your organization too, more people may think 'it's okay to make mistakes.'",
    },
    detailedInsight: {
      ko: "Amy Edmondson 교수의 연구에 따르면, 최고 성과 병원들은 '더 많은 실수를 보고'합니다. 실제로 실수가 더 많은 것이 아니라, 실수를 숨기지 않고 보고하는 문화가 있어서 학습과 개선이 이루어지기 때문입니다. 실수를 숨기는 문화는 더 큰 실패로 이어집니다. 당신이 실수를 인정하면, 오히려 신뢰를 얻을 가능성이 높습니다.",
      en: "Professor Amy Edmondson's research shows top-performing hospitals 'report more mistakes.' Not because they have more, but because their culture of not hiding mistakes enables learning and improvement. Cultures that hide mistakes lead to bigger failures. Admitting mistakes likely builds trust.",
    },
    category: "workplace",
  },
  {
    id: "asking-for-help",
    title: {
      ko: "도움을 요청하면 무능하게 보일 것이다",
      en: "Asking for help will make me look incompetent",
    },
    description: {
      ko: "이렇게 느끼는 사람은 몇 %일까요?",
      en: "What percentage of people feel this way?",
    },
    actualPercentage: 35,
    source: {
      name: "Harvard Business Review",
      url: "https://hbr.org/2018/05/why-asking-for-help-is-so-hard-but-so-important",
      year: 2023,
    },
    insight: {
      ko: "35%만이 이렇게 생각합니다. 실제로 대부분의 사람들(65%)은 도움을 요청하는 것을 긍정적으로 봅니다.",
      en: "Only 35% think this way. Most people (65%) actually view asking for help positively.",
    },
    detailedInsight: {
      ko: "심리학 연구에 따르면, 우리는 '도움 요청 시 거절당할 확률'을 실제보다 2배 높게 추정합니다. 또한 도움을 요청받은 사람은 오히려 '필요하다고 인정해줘서 기분 좋다', '신뢰의 표시로 느껴진다'고 응답합니다. 도움 요청을 '약점 노출'로 보는 것은 착각입니다. 오히려 '자기 인식'과 '협력 의지'의 표시로 인식됩니다.",
      en: "Psychology research shows we overestimate rejection probability for help requests by 2x. Those asked for help often feel 'flattered to be needed' and see it 'as a sign of trust.' Viewing help requests as 'showing weakness' is an illusion. It's actually seen as 'self-awareness' and 'willingness to collaborate.'",
    },
    category: "workplace",
  },
  {
    id: "sme-first-job",
    title: {
      ko: "첫 직장으로 중소기업에서 시작해도 괜찮다",
      en: "Starting your career at a small business is perfectly fine",
    },
    description: {
      ko: "이 의견에 동의하는 사람은 몇 %일까요?",
      en: "What percentage of people agree with this?",
    },
    actualPercentage: 75,
    source: {
      name: "BambooHR Employee Happiness Index",
      url: "https://www.bamboohr.com/resources/guides/employee-happiness-index",
      year: 2023,
    },
    insight: {
      ko: "75%의 중소기업 직원들이 자신의 직장에 매우 만족합니다. '대기업이 아니면 안 된다'는 인식과 달리, 중소기업 직원들의 만족도가 오히려 더 높습니다.",
      en: "75% of small business employees are very satisfied with their jobs. Contrary to the belief that 'only big companies matter,' SME employees often report higher satisfaction.",
    },
    detailedInsight: {
      ko: "BambooHR의 2023년 연구에 따르면, 중소기업 직원들은 대기업 직원들보다 직장 행복도가 평균 11점 더 높습니다. 이는 더 밀접한 동료 관계, 의미 있는 기여 실감, 유연한 근무 환경 때문입니다. 그러나 우리는 '남들이 대기업 선호할 것'이라 생각하며 중소기업 취업을 부끄러워합니다. 실제로 대부분의 사람들은 '어디서 일하느냐'보다 '어떻게 일하느냐'를 더 중요하게 생각합니다.",
      en: "BambooHR's 2023 study shows SME employees score 11 points higher on workplace happiness than large company employees. This stems from closer colleague relationships, meaningful contribution, and flexible work environments. Yet we assume 'others prefer big companies' and feel embarrassed about SME jobs. In reality, most people value 'how you work' over 'where you work.'",
    },
    category: "workplace",
  },
];

export function getQuestionById(id: string): QuestionData | undefined {
  return questions.find((q) => q.id === id);
}

export function getQuestionsByCategory(
  category: QuestionData["category"],
): QuestionData[] {
  return questions.filter((q) => q.category === category);
}
