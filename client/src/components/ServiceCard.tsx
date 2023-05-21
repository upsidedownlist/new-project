import { ReactElement, useEffect } from 'react';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { useHistory } from 'react-router-dom';
import { CounsellingService } from '../types/counselling-service.types';
import { Specialty } from '../types/specialty.type';

type Props = {
	service: CounsellingService;
};

// logic for defining tags is not determined yet
// const tags: string[] = ['Peer', '24/7', 'Professional', 'Phone', 'Online'];

const ServiceCard = ({ service }: Props): ReactElement => {
  let tags: string[] = [];

  const specialties: Specialty[] = service.specialty;
  for (const specialty of specialties) tags.push(specialty.label);

  tags = tags.concat(service.delivery, service.targetClients, service.serviceType);
  // tags = tags.concat(service.delivery, service.targetClients);

	const history = useHistory();

	const handleClick = () => {
		history.push(`services/${service.secondaryID}`);
	};

	return (
		<div className="serviceCard" onClick={handleClick}>
			<div className="cardContent">
				<div className="title">
					<div className="name">{service.serviceName}</div>

					<div className="ratingItem">
						<StarOutlineRoundedIcon className="favourite" onClick={() => { }} />
						<h6 className="rating">{'5.0'}</h6>
						<h6 className="maxRating">/ 5.0</h6>
						<ShareOutlinedIcon className="shareIcon"></ShareOutlinedIcon>
					</div>
				</div>
				<div className="information">
					<ul className="informationList">
						<li>{service.location}</li>
						<li>|</li>
						<li className="reviews">
							<a href="https://www.w3schools.com/">{'5'} reviews</a>
						</li>
						<li>|</li>
						<li>{'245'} likes</li>
					</ul>
				</div>

				<div className="tags">
					{tags.map((tag, index) => (
						<div className="tag" key={index}>
							{tag}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ServiceCard;
