import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../supabase/client";
import { Comment } from "../types/index";
import { UseContext } from "../context/userContext";
import { UsingAccountContext } from "../context/accountContext";

const Comments = () => {
  // usages
  const { id } = useParams();
  const { user } = UseContext();
  const [comment, setComment] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState<string>("");
  const { account } = UsingAccountContext();
  const [loading, setLoading] = useState<boolean>(true);

  // functions
  const gettingComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("postComment", id);

    if (data) {
      setComment(data);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleSubmit = async () => {
      const res = await supabase.from("comments").insert([
        {
          content: commentInput,
          postComment: id,
          posterId: user?.id,
          posterName: account.username,
        },
      ]);
      if (res.status === 201) {
        setCommentInput("");
        gettingComments();
      }
  };

  // useeffects
  useEffect(() => {
    gettingComments();
  }, []);

  return (
    <main className="py-4 px-4 text-primary h-screen">
      <header className="border-b border-muted fixed w-full px-2 right-0 left-0 pb-2">
        <Link  to={"/"}>
          <ChevronLeft />
        </Link>
      </header>
      {loading ? (
        <div className="h-full flex items-center justify-center pb-5">
          <p className="">Loading...</p>
        </div>
      ) : (
        <div className="h-screen">
          {comment.length < 1 ? (
            <section className="h-full flex items-center justify-center">
              <h2>There are not comments yet</h2>
            </section>
          ) : (
            <div>
              <section className="flex flex-col mt-12 gap-5">
                {comment.map((comment) => {
                  return (
                    <div key={comment.id} className="flex items-center gap-1">
                      <h3 className="font-medium text-sm leading-none ">
                        {comment.posterName}:
                      </h3>
                      <p className="text-xs font-light leading-3 flex items-center">
                        {comment.content}
                      </p>
                    </div>
                  );
                })}
              </section>
              <section className="relative"></section>
            </div>
          )}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        action=""
        className="flex gap-2 fixed bottom-0 w-full mb-2 px-4  right-0 left-0"
      >
        <Input
        autoFocus
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Write a comment"
          value={commentInput}
        />
        <Button disabled={commentInput == ""}>Comment</Button>
      </form>
    </main>
  );
};

export default Comments;
