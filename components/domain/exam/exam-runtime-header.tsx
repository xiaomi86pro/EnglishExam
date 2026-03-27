"use client";

import { useEffect, useState, useCallback } from "react";
import type { ExamDisplayState } from "@/lib/mappers/exam";
import { ExamStateBadge } from "@/components/domain/exam/exam-state-badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/overlay/modal";
import { cn } from "@/lib/utils";

interface ExamRuntimeHeaderProps {
  title: string;
  state: ExamDisplayState;
  remainingSeconds: number;
  answeredCount: number;
  totalQuestions: number;
  onSubmit: () => Promise<void> | void;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function ExamRuntimeHeader({
  title,
  state,
  remainingSeconds,
  answeredCount,
  totalQuestions,
  onSubmit,
}: ExamRuntimeHeaderProps) {
  const [secondsLeft, setSecondsLeft] = useState(remainingSeconds);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isCompleted = state === "submitted" || state === "graded";

  const isInProgress = state === "in_progress";

  const progressPercent =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  // Sync timer when prop changes
  useEffect(() => {
    setSecondsLeft(remainingSeconds);
  }, [remainingSeconds]);

  // Auto countdown (UI only)
  useEffect(() => {
    if (!isInProgress) return;
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isInProgress, secondsLeft]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    if (!isInProgress) return;

    try {
      setSubmitting(true);
      await onSubmit();
    } finally {
      setSubmitting(false);
      setIsModalOpen(false);
    }
  }, [submitting, isInProgress, onSubmit]);

  return (
    <>
      <div className="flex items-center justify-between border-b pb-4">
        {/* LEFT */}
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">{title}</h1>
          <ExamStateBadge state={state} />
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {/* Progress */}
          {isInProgress && (
            <div className="text-sm text-slate-600">
              Answered {answeredCount} / {totalQuestions} ({progressPercent}%)
            </div>
          )}

          {/* Timer or Completed */}
          {isCompleted ? (
            <span className="text-sm font-medium text-slate-500">
              Completed
            </span>
          ) : (
            <span
              className={cn(
                "text-lg font-mono font-semibold",
                secondsLeft <= 60 && "text-red-600",
              )}
            >
              {formatTime(secondsLeft)}
            </span>
          )}

          {/* Submit Button */}
          <Button
            variant="destructive"
            onClick={() => setIsModalOpen(true)}
            disabled={!isInProgress || submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => !submitting && setIsModalOpen(false)}
      >
        <div className="space-y-4 max-w-sm">
          <h2 className="text-lg font-semibold">Confirm Submission</h2>

          <p className="text-sm text-slate-600">
            You have answered {answeredCount} out of {totalQuestions} questions.
            <br />
            Are you sure you want to submit?
          </p>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={submitting}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Confirm"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
