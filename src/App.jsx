import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout';
import DashboardPage from './pages/dashboard';
import BookingsPage from './pages/bookings';
import NotFoundPage from './pages/not-found';
import AuthPage from './pages/auth';
import "react-multi-carousel/lib/styles.css";
import { Toaster } from 'react-hot-toast';
import RoomsPage from './pages/rooms';
import EditRoom from './pages/rooms/EditRoom';
import CreateRoom from './pages/rooms/CreateRoom';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/owner" element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="rooms/:propertyId/room/:roomId" element={<EditRoom />} />
          <Route path="rooms/create" element={<CreateRoom />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
      </>

  );
}
