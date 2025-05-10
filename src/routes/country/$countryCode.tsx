import { ErrorComponent, type ErrorComponentProps, Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/country/$countryCode')({
  loader: ({ context: { queryClient }, params: { postId } }) => {
    return queryClient.ensureQueryData(postQueryOptions(postId))
  },
  errorComponent: PostErrorComponent,
  component: PostComponent,
})

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return (
    <div>
      FUCK NOT WORKING
      <ErrorComponent error={error} />
    </div>
  )
}

function PostComponent() {
  const postId = Route.useParams().postId
  const { data: post } = useSuspenseQuery(postQueryOptions(postId))

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
    </div>
  )
}
