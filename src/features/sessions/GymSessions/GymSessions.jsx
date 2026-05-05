import { useState } from "react";
import Button from "../../../components/ui/Button/Button";
import { useSessions } from "../../../hooks/useSessions";
import { useSessionsActions } from "../../../hooks/useSessionsActions";
import { useSessionsList } from "../../../hooks/useSessionsList";
import layout from "../../../layout/AppLayout.module.css";
import deleteIcon from "../../../resources/deleteIcon.svg";
import { formatDate, formatDay } from "../../../utils/sessionsUtils";
import styles from "./GymSessions.module.css";
import ConfirmDeleteModal from "../../../components/ui/ConfirmDeleteModal/ConfirmDeleteModal";
import { TOAST_TYPE } from "../../../App";

function GymSessions({ sessions, setSessions, showToast }) {
  const { deleteSession } = useSessionsActions(setSessions);
  const { sortedSessions, totalVolume } = useSessionsList(sessions);
  const [sessionToDelete, setSessionToDelete] = useState(null);

  const handleDeleteSession = (sessionId) => {
    deleteSession(sessionId);
    showToast("Session deleted!", TOAST_TYPE.DELETE);
  };

  return (
    <div>
      <div className={`${layout.mutedPanel} ${styles.summary}`}>
        <article>
          <span>Total sessions</span>
          <strong>{sessions.length}</strong>
        </article>
        <article>
          <span>Volume</span>
          <strong>{Math.round(totalVolume / 100) / 10}t</strong>
        </article>
      </div>

      <div className={styles.sectionTitle}>
        <h3>Sessions</h3>
        <span>{sortedSessions.length}</span>
      </div>

      {sortedSessions.length === 0 && (
        <div className={layout.emptyState}>
          <strong>No sessions yet</strong>
          <span>Finished workouts will show up here.</span>
        </div>
      )}

      <div className={styles.sessionList}>
        {sortedSessions.map((session) => (
          <div className={styles.session} key={session.id}>
            <span className={styles.dateChip}>
              {formatDay(session.startedAt)}
            </span>
            <span>
              <span className={styles.sessionName}>{session.templateName}</span>
              <span className={styles.sessionMeta}>
                {formatDate(session.startedAt)}
              </span>
            </span>
            <Button
              type="button"
              variant="icon"
              onClick={(e) => {
                e.preventDefault();
                setSessionToDelete(session);
              }}
            >
              <img src={deleteIcon} alt="Delete template" />
            </Button>
          </div>
        ))}
      </div>
      {sessionToDelete && (
        <ConfirmDeleteModal
          onCancel={() => setSessionToDelete(null)}
          onDelete={() => {
            handleDeleteSession(sessionToDelete.id);
            setSessionToDelete(null);
          }}
          type={"session"}
        />
      )}
    </div>
  );
}

export default GymSessions;
