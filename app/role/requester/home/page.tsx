export default function RequestHome() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-2">
      <div className="bg-red-300">
        Menu
        <p>All Requests</p>
        <p>New Request</p>
        <p>Help</p>
        <p>Settings</p>
      </div>
      <div>
        requests list
        <div>request</div>
      </div>
      <div>selected request</div>
    </div>
  );
}
