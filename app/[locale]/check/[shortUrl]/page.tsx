const CheckshortUrl = ({ params }: { params: { shortUrl: string } }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2>URL Check</h2>
      <p>shortUrl: {params.shortUrl}</p>
    </div>
  );
};

export default CheckshortUrl;