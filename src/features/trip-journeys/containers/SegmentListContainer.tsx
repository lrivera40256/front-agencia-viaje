// Es un componente inteligente que se encarga de la lógica del listado, para que la UI quede limpia.
import { useSegments } from '@/features/trip-form/contexts/segmentsContext';
import { SegmentList } from '../components/SegmentList';
import { useSegmentToggle } from '../hooks/useSegmentToggle';

export const SegmentListContainer = () => {
  const { segments } = useSegments();
  const { openId, toggle } = useSegmentToggle();

  const isEmpty = segments.length === 0;

  console.log(segments)
  return (
    <div>
      {isEmpty ? (
        <p className="text-gray-500 text-sm italic p-4 border rounded-md bg-gray-50">
          No hay trayectos disponibles. Por favor, crea un trayecto.
        </p>
      ) : (
        <SegmentList
          segments={segments}
          openId={openId}
          onToggle={toggle}
        />
      )}

    </div>
  );
};
