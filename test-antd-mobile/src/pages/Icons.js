import { Icon, Grid } from 'antd-mobile';
import 'antd-mobile/lib/grid/style/css';
import 'antd-mobile/lib/icon/style/css';

const list = [
    'check-circle', 'check', 'check-circle-o',
    'cross-circle', 'cross', 'cross-circle-o',
    'up', 'down', 'left',
    'right', 'ellipsis',
    'loading',
];

const Icons = () => {
    const data = list.map(item => ({
        icon: (<Icon type={item} />),
        text: item,
    }));
    return (
        <Grid data={data} columnNum={3} hasLine={false} activeStyle={false} />
    );
};

export default Icons;
