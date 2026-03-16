import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useThemeColor } from 'heroui-native';
import { isSameDay, buildCells } from '@shared/utils/date.utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface CalendarProps {
  value?: Date;
  onChange: (date: Date) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Calendar({ value, onChange }: CalendarProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(() => value ?? today);

  const mutedColor = useThemeColor('muted') as string;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = buildCells(year, month);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handleSelect = (date: Date) => {
    setViewDate(date);
    onChange(date);
  };

  return (
    <View className="bg-surface rounded-2xl p-3 border border-border">
      {/* Month / Year header */}
      <View className="flex-row items-center justify-between mb-3 px-1">
        <Pressable onPress={prevMonth} hitSlop={8} className="p-1">
          <ChevronLeft size={16} color={mutedColor} />
        </Pressable>
        <Text className="text-foreground font-semibold text-sm">
          {MONTHS[month]} {year}
        </Text>
        <Pressable onPress={nextMonth} hitSlop={8} className="p-1">
          <ChevronRight size={16} color={mutedColor} />
        </Pressable>
      </View>

      {/* Week day headers */}
      <View className="flex-row mb-1">
        {WEEK_DAYS.map(d => (
          <View key={d} className="flex-1 items-center py-1">
            <Text className="text-muted text-xs">{d}</Text>
          </View>
        ))}
      </View>

      {/* Day grid — 6 rows × 7 cols */}
      {Array.from({ length: 6 }, (_, row) => (
        <View key={row} className="flex-row">
          {cells.slice(row * 7, row * 7 + 7).map(({ day, currentMonth, date }, col) => {
            const selected = value ? isSameDay(date, value) : false;
            const todayCell = isSameDay(date, today);

            const cellClass = selected
              ? 'bg-accent'
              : todayCell
              ? 'border border-accent'
              : '';

            const textClass = selected
              ? 'text-accent-foreground font-semibold'
              : todayCell
              ? 'text-accent font-semibold'
              : currentMonth
              ? 'text-foreground font-normal'
              : 'text-muted font-normal';

            return (
              <Pressable
                key={col}
                onPress={() => handleSelect(date)}
                className="flex-1 items-center justify-center py-0.5"
              >
                <View className={`w-8 h-8 items-center justify-center rounded-full ${cellClass}`}>
                  <Text className={`text-xs ${textClass}`}>{day}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
