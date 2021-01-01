export const Detail = ({ text, color = "black" }) => {
  const style = {
    left: 0,
    right: 0,
  };
  return (
    <div className="p-rel" style={style}>
      <p className={`font-1 p-abs w-100 text-center colorable c-${color}`} dangerouslySetInnerHTML={{__html: text }}>
      </p>
    </div>
  );
};
