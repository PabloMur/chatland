import GuestRooms from "@/components/GuestRooms";
import UserRooms from "@/components/UserRooms";
import PageContainer from "@/components/containers/PageContainer";

const MyRoomsPage = () => {
  return (
    <PageContainer title="Mis Salas">
      <div className="flex flex-col sm:flex-row flex-1 gap-6 p-6">
        {/* Tus salas */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(168,85,247,0.12)", color: "#a855f7" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h2 className="text-base font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
              Tus salas
            </h2>
          </div>
          <UserRooms />
        </div>

        {/* Divider */}
        <div className="w-px hidden sm:block" style={{ background: "rgba(255,255,255,0.05)" }} />
        <div className="h-px sm:hidden" style={{ background: "rgba(255,255,255,0.05)" }} />

        {/* Salas como invitado */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(34,211,238,0.08)", color: "#22d3ee" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h2 className="text-base font-semibold" style={{ color: "rgba(255,255,255,0.75)" }}>
              Invitado
            </h2>
          </div>
          <GuestRooms />
        </div>
      </div>
    </PageContainer>
  );
};
export default MyRoomsPage;
