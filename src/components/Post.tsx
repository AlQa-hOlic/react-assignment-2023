interface PostProps {
  title: string;
  body: string;
}

export default function Post({ title, body }: PostProps) {
  return (
    <div className="bg-card text-card-foreground -mx-1 w-1/2 rounded-lg border shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm">{body}</p>
      </div>
    </div>
  );
}
