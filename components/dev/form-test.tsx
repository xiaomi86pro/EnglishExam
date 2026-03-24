"use client"

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
import { FormField } from "@/components/ui/form/form-field";
import {
  FormLabel,
  FormControl,
  FormDescription,
  FormError,
} from "@/components/ui/form/form-components"
import { FormSection } from "@/components/ui/form/form-section";
import { FieldGroup } from "@/components/ui/form/field-group";
import { Input } from "@/components/ui/input/input";
import { Checkbox } from "@/components/ui/input/checkbox";
import { SearchBar } from "@/components/ui/search-bar";
import { FilterDropdown } from "@/components/ui/filter-dropdown";
import { Pagination } from "@/components/ui/pagination";
import { PageHeader } from "@/components/ui/page-header";
import { Toolbar } from "@/components/ui/toolbar";
import { FilterBar } from "@/components/ui/filter-bar";
import { RoleBadge } from "@/components/domain/role-badge";



import "@/styles/globals.css"; // chứa tokens

const data = [
  { id: "1", name: "Math Final", score: 85 },
  { id: "2", name: "Physics Midterm", score: 92 },
];

export function FormTest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState<"asc" | "desc" | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const allSelected = selectedIds.length === data.length;
  const someSelected = selectedIds.length > 0;
  const [accept, setAccept] = useState(false)


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

       <div className="flex gap-4 p-10">
      <RoleBadge role="admin" />
      <RoleBadge role="teacher" />
      <RoleBadge role="student" />
      </div>

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

      <div className="max-w-xl mx-auto py-10 space-y-10">

      {/* ================= SECTION 1 ================= */}

      <FormSection
        title="Account Information"
        description="Basic account credentials"
      >
        <FormField error="Email is required">
          <FormLabel required>Email</FormLabel>

          <FormControl>
            <Input placeholder="Enter email" />
          </FormControl>

          <FormDescription>
            We will never share your email.
          </FormDescription>

          <FormError />
        </FormField>
      </FormSection>

      {/* ================= SECTION 2 ================= */}

      <FormSection
        title="Preferences"
        description="Select your options"
      >
        <FormField>
          <FormLabel>Notification Settings</FormLabel>

          <FormControl>
            <FieldGroup direction="col">
              <label className="flex items-center gap-2">
                <Checkbox />
                <span>Email notifications</span>
              </label>

              <label className="flex items-center gap-2">
                <Checkbox />
                <span>SMS notifications</span>
              </label>
            </FieldGroup>
          </FormControl>
        </FormField>
      </FormSection>

      {/* ================= SECTION 3 ================= */}

      <FormSection title="Terms">
        <FormField
          error={!accept ? "You must accept terms" : undefined}
        >
          <FormControl>
            <label className="flex items-center gap-2">
              <Checkbox
                checked={accept}
                onCheckedChange={(value: boolean) =>
                  setAccept(value)
                }
              />
              <span>I agree to the terms and conditions</span>
            </label>
          </FormControl>

          <FormError />
        </FormField>
      </FormSection>

    </div>
      
   
      <div className="space-y-6 p-10 max-w-md">
      <SearchBar placeholder="Search..." onSearch={(v) => console.log(v)} />

      <FilterDropdown
        options={[
          { label: "All", value: "all" },
          { label: "Active", value: "active" },
          { label: "Archived", value: "archived" },
        ]}
      />

      <Pagination page={page} totalPages={5} onPageChange={setPage} />
    </div>

    <div className="space-y-6 p-10 max-w-4xl">
      <PageHeader
        title="Question Bank"
        description="Manage and organize all questions"
        actions={<button className="px-4 py-2 border rounded-md">Add</button>}
      />

      <Toolbar
        left={
          <FilterBar>
            <SearchBar placeholder="Search..." />
            <FilterDropdown
              options={[
                { label: "All", value: "all" },
                { label: "MCQ", value: "mcq" },
              ]}
            />
          </FilterBar>
        }
        right={<button className="px-4 py-2 border rounded-md">Export</button>}
      />

      <Pagination page={page} totalPages={5} onPageChange={setPage} />
    </div>
    </div>
  );
}