import layout from "../layout/AppLayout.module.css";

function ErrorPage() {
  return (
    <div className={`${layout.page} ${layout.narrow}`}>
      <div className={layout.emptyState}>
        <strong>404 - Page Not Found</strong>
        <span>Sorry, the page you are looking for does not exist.</span>
      </div>
    </div>
  );
}

export default ErrorPage;
