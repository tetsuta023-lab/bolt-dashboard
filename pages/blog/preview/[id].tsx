import { useRouter } from "next/router";
export default function BlogPreview() {
  const { id } = useRouter().query;
  return <div>Blog Preview: {id}</div>;
}
