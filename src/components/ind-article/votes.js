const Votes = ({ votes, comments }) => {
  return (
    <div className="votes">
      <h6>Votes: {votes}</h6>
      <h6>Comments: {comments}</h6>
    </div>
  );
};

export default Votes;
