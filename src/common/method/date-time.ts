
export const timeAgo = (date: Date): { title: I18nKeys; options?: { count: number } } => {
  const diff = (new Date().getTime() - date.getTime()) / 1000;

  const day_diff = Math.floor(diff / 86400);

  const conditions: {
    check: boolean;
    result: { title: I18nKeys; options?: any };
  }[] = [
    {
      check: isNaN(day_diff) || day_diff < 0 || day_diff >= 31,
      result: { title: 'date:just_now' },
    },
    { check: day_diff === 0 && diff < 60, result: { title: 'date:just_now' } },
    {
      check: day_diff === 0 && diff < 120,
      result: { options: { count: 1 }, title: 'date:minute_ago' },
    },
    {
      check: day_diff === 0 && diff < 3600,
      result: {
        options: { count: Math.floor(diff / 60) },
        title: 'date:minute_ago',
      },
    },
    {
      check: day_diff === 0 && diff < 7200,
      result: { options: { count: 1 }, title: 'date:hour_ago' },
    },
    {
      check: day_diff === 0 && diff < 86400,
      result: {
        options: { count: Math.floor(diff / 3600) },
        title: 'date:hour_ago',
      },
    },
    { check: day_diff === 1, result: { title: 'date:yesterday' } },
    { check: day_diff < 7, result: { title: 'date:last_week' } },
    { check: day_diff < 31, result: { title: 'date:last_month' } },
    {
      check: day_diff < 365,
      result: {
        options: { count: Math.ceil(day_diff / 30) },
        title: 'date:months_ago',
      },
    },
    { check: day_diff === 365, result: { title: 'date:last_year' } },
    {
      check: true,
      result: {
        options: { count: Math.floor(day_diff / 365) },
        title: 'date:years_ago',
      },
    },
  ];

  for (const condition of conditions) {
    if (condition.check) {
      return condition.result;
    }
  }

  return {
    options: { count: Math.floor(day_diff / 365) },
    title: 'date:years_ago',
  };
};
