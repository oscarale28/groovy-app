'use client'

import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { createPlaylistAndAddTrack } from '@/lib/actions/playlists'
import { toast } from 'sonner'
import { createPlaylistSchema, CreatePlaylistFormValues } from '@/lib/schemas/playlist'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod';

interface NewPlaylistFormProps {
  trackId: string
  onSuccess: () => void
}

export function NewPlaylistForm({ trackId, onSuccess }: NewPlaylistFormProps) {
  const form = useForm<CreatePlaylistFormValues>({
    resolver: zodResolver(createPlaylistSchema),
    defaultValues: {
      name: '',
      description: '',
      visibility: 'private',
    },
  })

  const onSubmit = async (values: CreatePlaylistFormValues) => {
    try {
      await createPlaylistAndAddTrack(values.name, values.description || null, values.visibility, trackId)
      toast.success(`"${values.name}" has been created and track added.`)
      onSuccess()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Playlist Name</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="My awesome playlist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="A brief description of my playlist" {...field} value={field.value ?? ''} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Visibility</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col lg:flex-row space-y-1"
                >
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <RadioGroupItem value="public" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Public
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-y-0">
                    <FormControl>
                      <RadioGroupItem value="private" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Private
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Creating...' : 'Create Playlist and Add Track'}
        </Button>
      </form>
    </Form>
  )
}