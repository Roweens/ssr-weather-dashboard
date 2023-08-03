import { memo } from 'react';

interface [FTName]Props {
   className?: string;
}

export const [FTName] = memo((props:[FTName]Props) => {
   const { className } = props;


   return (
      <div className={''}>
         {FTName}
      </div>
   );
})