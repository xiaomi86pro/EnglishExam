import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Container } from "@/components/ui/layout/container";
import { Stack } from "@/components/ui/layout/stack";
import { Grid } from "@/components/ui/layout/grid";
import { Spacer } from "@/components/ui/layout/spacer";


export default function Page() {
  return (
    <div className="p-10 space-y-4">
      <Heading as="h1" size="h1">
        Exam Dashboard
      </Heading>

      <Text>
        Welcome to the exam management system.
      </Text>

      <Text size="body-sm" tone="muted">
        Created at 21/03/2026
      </Text>

      <Text tone="danger" weight="medium">
        Error state example
      </Text>

      <Text tone="muted">Muted text</Text>
      <Text tone="danger">Error text</Text>

      <div className="bg-surface p-4 border border-default">
        Card Surface
      </div>

    <Container>
      <Stack gap={6}>
        <Heading as="h1" size="h1">
          Dashboard
        </Heading>

        <Text>Welcome to exam system.</Text>

        <Grid cols={3} gap={4}>
          <div className="bg-surface p-4 border border-default">A</div>
          <div className="bg-surface p-4 border border-default">B</div>
          <div className="bg-surface p-4 border border-default">C</div>
        </Grid>

        <Spacer size={8} />
      </Stack>
     </Container> 
    </div>
    
  );
}