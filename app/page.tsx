import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

export default function Page() {
  return (
    <div className="space-y-4">
      <Heading as="h1" size="h1">
        Exam Dashboard
      </Heading>

      <Text>
        Welcome to the exam management system.
      </Text>

      <Text size="body-sm" tone="muted">
        Created at 21/03/2026
      </Text>
    </div>
  );
}