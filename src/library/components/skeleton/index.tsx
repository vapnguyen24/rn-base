import { Box } from '~/src/library/components/core/Box';
import { SkeletonProps } from '~/src/library/components/skeleton/type';

export const Skeleton = ({
  count = 1,
  itemSpacing = 'm_16',
  renderSkeleton,
  color = 'neutral50',
}: SkeletonProps) => {
  const renderItem = (_: unknown, index: number) => {
    if (!!renderSkeleton) return renderSkeleton;

    return (
      <Box key={index}>
        <Box backgroundColor={color} mb="s_8" borderRadius="m_6" height={16} width={'70%'} />
        <Box backgroundColor={color} mb="s_8" borderRadius="m_6" height={16} width={'30%'} />
        <Box backgroundColor={color} mb="s_8" borderRadius="m_6" height={16} width={'100%'} />
        <Box backgroundColor={color} borderRadius="m_6" height={16} width={'80%'} />
      </Box>
    );
  };

  return <Box gap={itemSpacing}>{Array(count).fill(0).map(renderItem)}</Box>;
};
