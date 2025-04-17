/**
 * 动态设置网站favicon
 */

export const setCustomFavicon = () => {
  // 获取现有的favicon元素
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  
  // 设置为我们的自定义SVG favicon
  link.href = `${process.env.PUBLIC_URL}/custom-favicon.svg`;
  
  // 同时更新apple-touch-icon
  let appleIcon = document.querySelector("link[rel~='apple-touch-icon']");
  if (appleIcon) {
    appleIcon.href = `${process.env.PUBLIC_URL}/custom-favicon.svg`;
  }
};
