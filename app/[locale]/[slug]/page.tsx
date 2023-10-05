export default function Category({ params }: { params: { slug: string } }) {
  return <section className="textWidth">{params.slug}</section>
}

export async function generateStaticParams() {
  // const categories = await api.getCategories()

  return [].map(
    (category: { attributes: { title: string; slug: string } }) => ({
      slug: category.attributes.slug,
    })
  )
}
