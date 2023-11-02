import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState, useEffect } from "react";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../supabase/client";
import { Comment } from "../types/index";
import { UseContext } from "../context/userContext";

const Comments = () => {
  // usages
  const { id } = useParams();
  const { user } = UseContext();
  const [comment, setComment] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState<string>("");

  // functions
  const gettingComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("postComment", id);
    if (data) {
      setComment(data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await supabase
      .from("comments")
      .insert([{ content: commentInput, postComment: id, posterId: user?.id }]);
      if(res.status === 201){
        setCommentInput('')
        gettingComments()
      }
  };

  // useeffects
  useEffect(() => {
    gettingComments();
    console.log(comment);
    console.log(user);
  }, []);

  return (
    <main className="py-4 px-4 text-primary">
      <header className="border-b border-muted fixed w-full px-2 right-0 left-0 pb-2">
        <Link to={"/"}>
          <ChevronLeft />
        </Link>
      </header>
      {comment.length < 1 ? (
        <section className="h-screen flex items-center justify-center">
          <h2>There are not comments yet</h2>
        </section>
      ) : (
        <div>
          <section className="flex flex-col mt-12 gap-5">
            {comment.map((comment) => {
              return (
                <div key={comment.id} className="flex items-center gap-1">
                  <h3 className="font-medium leading-none">Persona :</h3>
                  <p className="text-sm font-light leading-none">
                    {comment.content}
                  </p>
                </div>
              );
            })}
          </section>
          <section className="relative"></section>
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
          onChange={(e) => handleChange(e)}
          type="text"
          placeholder="Write a comment"
          value={commentInput}
        />
        <Button>Comment</Button>
      </form>
    </main>
  );
};

export default Comments;
