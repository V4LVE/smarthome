export type CurtainDevice = {
  id: string;
  label: string;
  room: string;
  description: string;
  accent: string;
  latestMeasuredTemperature?: number;
  latestMeasuredHumidity?: number;
};

export type CurtainScene = {
  id: string;
  label: string;
  description: string;
  desiredState: "open" | "close";
};

export const curtainDevices: CurtainDevice[] = [
  {
    id: "living-room",
    label: "Living room",
    room: "Main lounge",
    description: "Wide daylight control for movie nights, reading sessions, and bright afternoons.",
    accent: "from-sky-500 via-cyan-400 to-teal-400",
    latestMeasuredTemperature: 22.3,
    latestMeasuredHumidity: 45,
  },
  {
    id: "bedroom",
    label: "Bedroom",
    room: "Sleep zone",
    description: "Full blackout privacy for sleep routines, slow mornings, and quiet resets.",
    accent: "from-indigo-500 via-violet-500 to-fuchsia-500",
      latestMeasuredTemperature: 20.5,
      latestMeasuredHumidity: 40,
  },
  {
    id: "office",
    label: "Office",
    room: "Work nook",
    description: "Dial in glare-free focus while keeping the room calm and visually clean.",
    accent: "from-emerald-500 via-lime-400 to-yellow-400",
    latestMeasuredTemperature: 23.7,
    latestMeasuredHumidity: 42,
  },
  {
    id: "dining-room",
    label: "Dining room",
    room: "Shared space",
    description: "Balance natural light with privacy during dinners, guests, and evening routines.",
    accent: "from-orange-500 via-amber-400 to-rose-400",
    latestMeasuredTemperature: 21.1,
    latestMeasuredHumidity: 43,
  },
];

export const curtainScenes: CurtainScene[] = [
  {
    id: "open-all",
    label: "Open all",
    description: "Pull daylight across every room in one clean command.",
    desiredState: "open",
  },
  {
    id: "close-all",
    label: "Close all",
    description: "Instant privacy, temperature control, and a quieter mood.",
    desiredState: "close",
  },
];