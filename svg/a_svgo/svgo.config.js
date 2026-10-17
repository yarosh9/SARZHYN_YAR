export default {
  multipass: true, // Многопроходная оптимизация
  js2svg: {
    pretty: true,  // Включает удобочитаемый формат с отступами и переносами строк
    indent: 2,     // Размер отступа (2 пробела)
  },
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Отключаем плагины, которые сильно «сплющивают» код в одну строку, если это мешает
          inlineStyles: {
            onlyMatchedOnce: false,
          },
        },
      },
    },
  ],
};