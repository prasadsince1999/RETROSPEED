import React from 'react';
import { Lock, ArrowRight, AlertTriangle, BookOpen } from 'lucide-react';
import { Modal, Button, Badge, Card } from '../ui';

export default function JumpWarningModal({ lesson, onConfirm, onCancel }) {
  if (!lesson) return null;

  return (
    <Modal
      isOpen={true}
      onClose={onCancel}
      size="md"
      showCloseButton={true}
      className="p-6 sm:p-7 text-center"
    >
      {/* Warning / Lock Icon */}
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 border-2 border-amber-200/80 flex items-center justify-center text-amber-500 mb-3 shadow-inner">
          <Lock className="w-7 h-7" />
        </div>

        <Badge variant="amber" size="sm" icon={AlertTriangle} className="mb-2 font-bold">
          JUMP AHEAD WARNING
        </Badge>

        <h3 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Are you sure?
        </h3>

        <p className="text-sm text-slate-500 mt-2 px-2 leading-relaxed">
          We highly recommend going through every lesson in order and not jumping ahead so you develop steady finger muscle memory.
        </p>

        {/* Target Lesson Preview Card */}
        <Card variant="flat" padding="sm" className="mt-4 w-full text-left border-slate-200/80">
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <BookOpen className="w-3.5 h-3.5 text-sky-500" />
            <span>Target Lesson</span>
          </div>
          <div className="text-sm font-bold text-slate-800 mt-0.5">
            Lesson {lesson.id}: {lesson.title}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full mt-6">
          <Button
            variant="outline"
            size="md"
            onClick={onCancel}
            className="border-slate-200/80 text-slate-700 hover:bg-slate-50 font-semibold"
          >
            Go Back
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={onConfirm}
            rightIcon={ArrowRight}
            className="shadow-md shadow-sky-500/20 font-bold"
          >
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
}
