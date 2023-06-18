import { Button } from "@mono/web-ui";

export default function Index() {
  return (
    <div>
      <Button onClick={() => console.log('clicked')}>Click him</Button>
    </div>
  );
}