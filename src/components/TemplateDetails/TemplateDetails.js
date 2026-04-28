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
              <div className="exercise-details-header">
                <span>Sets</span>
                <span>Reps</span>
                <span>Kg</span>
              </div>
              <div className="exercise-details">
                <span>{exercise.sets}</span>
                <span>{exercise.reps}</span>
                <span>{exercise.kg}</span>
              </div>
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
