import { Button, Group } from "@mantine/core";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function IndexPage() {
  return (
    <Group mt={50} justify="center">
      <Map />
    </Group>
  );
}
