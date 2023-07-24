import type { Meta, StoryObj } from "@storybook/react";
import { AirportSelect } from "@/app/components/airport-select";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta = {
  title: "Example/AirportSelect",
  component: AirportSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { defaultValue: "Nereden" },
  },
  decorators: [
    (childiren) => (
      <QueryClientProvider client={queryClient}>
        {childiren()}
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof AirportSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Nereden: Story = {
  args: {
    icon: "origin",
    label: "Nereden",
  },
};

export const Nereye: Story = {
  args: {
    icon: "destination",
    label: "Nereye",
  },
};
