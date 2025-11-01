import { useRouter } from "next/router";
export default function BlogEdit() {
  const { id } = useRouter().query;
  return <div>Blog Edit: {id}</div>;
}
