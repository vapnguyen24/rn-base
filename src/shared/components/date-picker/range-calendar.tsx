import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useThemeColor } from 'heroui-native';
import { isSameDay, isDateBetween, buildCells } from '@shared/utils/date.utils';
import type { DateRange } from '@shared/utils/date.utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const CELL_HEIGHT = 36;
const BAND_INSET = 2; // vertical inset for the range band

// ─── Props ────────────────────────────────────────────────────────────────────

interface RangeCalendarProps {
  value?: DateRange;
  onChange: (range: DateRange) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function RangeCalendar({ value, onChange }: RangeCalendarProps) {
  const today = new Date();
  const startDate = value?.start;
  const endDate = value?.end;

  const [viewDate, setViewDate] = useState(() => startDate ?? today);

  const mutedColor = useThemeColor('muted') as string;

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = buildCells(year, month);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  // Range is complete only when both ends are selected and different
  const rangeComplete =
    !!startDate && !!endDate && !isSameDay(startDate, endDate);

  const handleSelect = (date: Date) => {
    if (!startDate || rangeComplete) {
      onChange({ start: date, end: undefined });
    } else {
      if (isSameDay(date, startDate)) {
        onChange({});
      } else if (date < startDate) {
        onChange({ start: date, end: undefined });
      } else {
        onChange({ start: startDate, end: date });
      }
    }
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
            const isStart = startDate ? isSameDay(date, startDate) : false;
            const isEnd = endDate ? isSameDay(date, endDate) : false;
            const isSelected = isStart || isEnd;
            const todayCell = isSameDay(date, today);
            const inRange =
              startDate && endDate ? isDateBetween(date, startDate, endDate) : false;

            // Band spans full cell width, trimmed at start (left=50%) or end (right=50%)
            const showBand = rangeComplete && (inRange || isStart || isEnd);
            const bandLeft: `${number}%` = isStart ? '50%' : '0%';
            const bandRight: `${number}%` = isEnd ? '50%' : '0%';

            const circleClass = isSelected
              ? 'bg-accent'
              : todayCell
              ? 'border border-accent'
              : '';

            const textClass = isSelected
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
                className="flex-1"
              >
                <View
                  style={{ height: CELL_HEIGHT }}
                  className="items-center justify-center"
                >
                  {/* Range band — absolutely positioned behind the circle */}
                  {showBand && (
                    <View
                      className="bg-accent/20 absolute"
                      style={{
                        top: BAND_INSET,
                        bottom: BAND_INSET,
                        left: bandLeft,
                        right: bandRight,
                      }}
                    />
                  )}

                  {/* Day circle */}
                  <View
                    className={`w-8 h-8 items-center justify-center rounded-full ${circleClass}`}
                  >
                    <Text className={`text-xs ${textClass}`}>{day}</Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}
