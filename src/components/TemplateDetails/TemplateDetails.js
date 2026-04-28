import { useNavigate, useParams } from "react-router-dom";
import previous from "../../resources/previous.png";
import "./TemplateDetails.css";

function TemplateDetails({ templates }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = templates.find((t) => t.id === id);

  if (!template) {
    return <div>Template not found</div>;
  }

  return (
    <div className="page">
      <h2>{template.name}</h2>
      <div className="exercises">
        {template.exercises.map((exercise) => (
          <div key={exercise.id} className="exercise">
            <div>{exercise.name}</div>
            <div>
              {exercise.sets} sets x {exercise.reps} reps
            </div>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        <img src={previous} alt="Back" />
      </button>
    </div>
  );
}

export default TemplateDetails;
