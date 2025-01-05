import { Participant } from '@/@types/travel';
import useGetUser from '@/queries/user/useGetUser';
import TravelTag from '../../../common/tag/TravelTag';
import UserIcon from '../../../common/user/UserIcon';
import TravelDetailButtons from './TravelDetailButtons';

const TabTravelDetail = ({
  travelId,
  participationFlag,
  organizer,
  hashTags,
  description,
  bookmarkFlag,
}: {
  travelId: number;
  participationFlag: boolean | null;
  organizer?: Participant;
  hashTags: string;
  description: string;
  bookmarkFlag: boolean | null;
}) => {
  const { data: user } = useGetUser();

  const hashTagList = hashTags
    .split('#')
    .filter((tag) => tag !== '')
    .map((tag) => tag.trim());

  return (
    <section>
      <div className="flex items-center justify-between pb-[18px]">
        <div className="flex items-center gap-[7px]">
          <UserIcon size="sm" />

          <div className="body-2-sb">{organizer && organizer.nickname}</div>
        </div>
        {participationFlag !== null && user && organizer && (
          <TravelDetailButtons
            travelId={travelId}
            bookmarkFlag={bookmarkFlag}
            userId={user.userId}
            organizerId={organizer.id}
          />
        )}
      </div>
      <div className="flex flex-col gap-2.5 rounded border px-4 py-5 shadow-custom">
        <main className="body-1-r md:min-h-24">{description}</main>
        <div className="flex gap-1.5">
          {hashTagList.map((tag) => (
            <TravelTag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TabTravelDetail;
