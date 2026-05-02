import { Link, useNavigate, useParams } from "react-router-dom";
import edit from "../../resources/edit.png";
import previous from "../../resources/previous.png";
import Button from "../Button/Button";
import "./TemplateDetails.css";
import { useEffect } from "react";

function TemplateDetails({ templates, setSessions, sessions }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = templates.find((t) => t.id === id);

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  if (!template) {
    return <div>Template not found</div>;
  }

  const createSession = () => ({
    id: crypto.randomUUID(),
    templateName: template.name,
    templateId: template.id,
    startedAt: Date.now(),
    exercises: template.exercises.map((exercise) => ({
      ...exercise,
      sets: Array.from({ length: exercise.sets }, (_, i) => ({
        id: crypto.randomUUID(),
        setNumber: i + 1,
        reps: exercise.reps,
        kg: exercise.kg,
        completed: false,
      })),
    })),
  });

  const startSession = () => {
    const session = createSession();
    setSessions((prev) => [...prev, session]);
    console.log("session started");
    navigate(`/workout/session/${session.id}`);
  };

  return (
    <div className="page">
      <div className="template-details-header">
        <div className="template-name">
          <h2>{template.name}</h2>
          <Button variant={"submit"} onClick={() => startSession()}>
            Start workout
          </Button>
        </div>
        <Link to={`/template/${template.id}/edit`}>
          <Button type="icon" variant={"icon"}>
            <img src={edit} alt="Edit exercise" />
          </Button>
        </Link>
      </div>
      <hr></hr>
      <div>
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
      <Button type="icon" variant={"icon"} onClick={() => navigate("/")}>
        <img src={previous} alt="Back" />
      </Button>
    </div>
  );
}

export default TemplateDetails;
