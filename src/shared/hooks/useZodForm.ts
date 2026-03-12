import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodType } from 'zod';
import type { UseFormProps, FieldValues } from 'react-hook-form';

export function useZodForm<TSchema extends FieldValues>(
  schema: ZodType<TSchema, any, any>,
  options?: Omit<UseFormProps<TSchema>, 'resolver'>,
) {
  return useForm<TSchema>({
    ...options,
    resolver: zodResolver(schema),
  });
}
