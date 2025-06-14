export const metadata = {
  title: 'Página Cliente',
  description: 'Descrição da página cliente',
};

export default function Head() {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </>
  );
}
