export default async function sitemap() {
  const baseUrl = 'http://www.qmovies.net';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/movie`, lastModified: new Date() },
    { url: `${baseUrl}/serie`, lastModified: new Date() },
  ];
}
