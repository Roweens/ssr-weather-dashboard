import { memo } from 'react';
import styles from './Icon.module.scss';
import classNames from 'classnames';
import { Mods } from '@/types/Mods';

type SvgProps = Omit<
    React.SVGProps<SVGSVGElement>,
    'onClick' | 'stroke' | 'fill'
>;
type IconSize = 's' | 'm' | 'l';

interface IconBaseProps extends SvgProps {
    className?: string;
    buttonClassName?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    stroke?: boolean;
    fill?: boolean;
    disabled?: boolean;
    size?: IconSize;
}

interface NonClickableIconProps extends IconBaseProps {
    interactive?: false;
}

interface ClickableBaseProps extends IconBaseProps {
    interactive: true;
    onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableBaseProps;

export const Icon = memo((props: IconProps) => {
    const {
        className,
        buttonClassName,
        Svg,
        interactive,
        fill = true,
        stroke,
        disabled,
        size = 'm',
        ...otherProps
    } = props;

    const mods: Mods = {
        [styles.fill]: fill,
        [styles.disabled]: disabled,
        [styles.stroke]: stroke,
    };

    const icon = (
        <Svg
            className={classNames(styles.icon, mods, [className, styles[size]])}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (interactive) {
        return (
            <button
                type="button"
                className={classNames(styles.iconButton, {}, [
                    'group',
                    buttonClassName,
                ])}
                onClick={props.onClick}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
