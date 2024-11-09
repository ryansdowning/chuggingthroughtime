import dynamic from "next/dynamic";

import { Stack } from "@mantine/core";

import TimeScrubber from "../components/TimeScrubber";

const Map = dynamic(() => import("../components/Map"), {
  ssr: false,
});

export default function IndexPage() {
  return (
    <Stack gap="md">
      <TimeScrubber />
      <Map />
    </Stack>
  );
}
