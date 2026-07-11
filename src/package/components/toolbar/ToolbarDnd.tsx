'use client';

import { Button } from '@/components/ui/button';
import { useGrid } from '@/package/contexts/GridContext';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { CSSProperties } from 'react';

const DraggableColumnItem = ({
  columnId,
  label,
}: {
  columnId: string;
  label: string;
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: columnId });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="mun:flex mun:items-center mun:gap-2 mun:rounded mun:border mun:border-border mun:bg-muted mun:px-2 mun:py-1.5 mun:text-sm"
    >
      <span
        {...attributes}
        {...listeners}
        className="mun:flex mun:cursor-grab mun:items-center mun:text-muted-foreground"
      >
        <GripVertical size={16} />
      </span>
      <span className="mun:truncate">
        {label
          .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
          .replace(/^./, (str) => str.toUpperCase())}
      </span>
    </div>
  );
};

const ToolbarDnd = () => {
  const { table } = useGrid();

  const columnOrder = table.getState().columnOrder.length
    ? table.getState().columnOrder
    : table.getAllLeafColumns().map((column) => column.id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      const oldIndex = columnOrder.indexOf(active.id as string);
      const newIndex = columnOrder.indexOf(over.id as string);
      table.setColumnOrder(arrayMove(columnOrder, oldIndex, newIndex));
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="mun:flex mun:flex-col mun:gap-1.5 mun:h-full mun:py-1.5">
        <div className="mun:flex mun:items-center mun:justify-between mun:px-1.5 mun:pb-1.5 mun:border-b mun:border-border">
          <h1 className="mun:text-sm mun:font-bold">
            Columns DND ({table.getAllLeafColumns().length})
          </h1>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => table.resetColumnOrder()}
          >
            Restore
          </Button>
        </div>
        <div
          className="mun:space-y-2 mun:px-1.5 mun:flex-1 mun:overflow-y-auto mun:[&::-webkit-scrollbar]:w-2
  mun:[&::-webkit-scrollbar-track]:bg-stone-100
  mun:[&::-webkit-scrollbar-thumb]:bg-stone-300
  mun:dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  mun:dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <SortableContext
            items={columnOrder}
            strategy={verticalListSortingStrategy}
          >
            {columnOrder.map((columnId) => {
              const column = table.getColumn(columnId);
              if (!column) return null;
              return (
                <DraggableColumnItem
                  key={columnId}
                  columnId={columnId}
                  label={
                    typeof column.columnDef.header === 'string'
                      ? column.columnDef.header
                      : columnId
                  }
                />
              );
            })}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  );
};

export default ToolbarDnd;
