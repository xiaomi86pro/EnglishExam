"use client";

import { useState } from "react";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Container } from "@/components/ui/layout/container";
import { Stack } from "@/components/ui/layout/stack";
import { Grid } from "@/components/ui/layout/grid";
import { Spacer } from "@/components/ui/layout/spacer";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Modal } from "@/components/ui/modal";
import { Table, } from "@/components/ui/table/table";
import { TableHeader } from "@/components/ui/table/table-header";
import { TableRow } from "@/components/ui/table/table-row";
import { TableCell } from "@/components/ui/table/table-cell";
import { SortableHeader } from "@/components/ui/table/sortable-header";
import { EmptyState } from "@/components/ui/table/empty-state";
import { SelectHeader, SelectRow } from "@/components/ui/table/table-select";
import { TableBulkActions } from "@/components/ui/table/table-bulk-actions";
import { Button } from "@/components/ui/button";

import "@/styles/globals.css"; // chứa tokens

const data = [
  { id: "1", name: "Math Final", score: 85 },
  { id: "2", name: "Physics Midterm", score: 92 },
];

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState<"asc" | "desc" | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const allSelected = selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0;

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  function toggleSelectAll() {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map((d) => d.id));
    }
  }


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
      <div className="p-4 space-y-4">
        <Badge>New</Badge>

        <Alert variant="error">Something went wrong!</Alert>

        <Spinner />

        <Skeleton className="w-64 h-6" />
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

      <div className="p-8 space-y-6">
        {/* Card Example */}
        <Card>
          <h2 className="text-lg font-semibold">Card Title</h2>
          <p className="text-sm text-gray-600 mt-2">
            Đây là nội dung bên trong Card. Bạn có thể đặt bất cứ thứ gì ở đây.
          </p>
        </Card>

        {/* Divider Example */}
        <Divider />

        {/* Button mở Modal */}
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Mở Modal
        </button>

        {/* Modal Example */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-semibold">Modal Title</h3>
          <p className="mt-2 text-gray-700">
            Đây là nội dung trong Modal. Nhấn ngoài Modal để đóng.
          </p>
          <button
            className="mt-4 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => setIsModalOpen(false)}
          >
            Đóng Modal
          </button>
        </Modal>
      </div>

      <div className="p-10">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader
                direction={direction}
                onSort={() =>
                  setDirection((prev) =>
                    prev === "asc" ? "desc" : "asc"
                  )
                }
              >
                Name
              </SortableHeader>
              <SortableHeader>Role</SortableHeader>
              <SortableHeader>Score</SortableHeader>
            </TableRow>
          </TableHeader>

          <tbody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>Student</TableCell>
              <TableCell>85</TableCell>
            </TableRow>

            {/* Empty example */}
            {/* <EmptyState colSpan={3} /> */}
          </tbody>
        </Table>
      </div>
      <div className="p-10">

        <TableBulkActions selectedCount={selectedIds.length}>
          <Button variant="destructive">Delete</Button>
          <Button>Publish</Button>
        </TableBulkActions>

        <Table>
          <TableHeader>
            <tr>
              <SelectHeader
                allSelected={allSelected}
                someSelected={someSelected}
                onSelectAll={toggleSelectAll}
              />
              <SortableHeader>Name</SortableHeader>
              <SortableHeader>Score</SortableHeader>
            </tr>
          </TableHeader>

          <tbody>
            {data.map((row) => (
              <SelectRow
                key={row.id}
                id={row.id}
                selected={selectedIds.includes(row.id)}
                onSelect={toggleSelect}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.score}</TableCell>
              </SelectRow>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}