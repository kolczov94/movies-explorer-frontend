import './Scale.css';

export default function Scale() {
  return (
    <div className="scale">
      <div className="scale__column">
        <div className="scale__lable scale__lable_color_green">1 неделя</div>
        <div className="scale_descr">Back-end</div>
      </div>
      <div className="scale__column">
        <div className="scale__lable">4 недели</div>
        <div className="scale_descr">Front-end</div>
      </div>
    </div>
  );
};