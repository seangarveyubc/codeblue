import React, { useContext, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';
import { AppContext } from '../../../backgroundMode/context/AppContext';
import { BackgroundMode } from '../../../backgroundMode/models/BackgroundMode';
import Colours from '../../../constants/Colours';
import { TriggerCall } from '../../../EMSCall/TriggerCall';
import { EmergencyProtocolStack } from '../../../navigation/EmergencyProtocolStack';
import { Alert } from 'react-native';

interface Props {
    navigation: any;
}

export const LegalScreen = ({ navigation }: Props) => {
    useEffect(() => {
        messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
            console.log(remoteMessage);

            let message_body = remoteMessage.notification.body;
            let message_title = remoteMessage.notification.title;

            Alert.alert(message_title, message_body);
            navigation.navigate('EmergencyProtocol');
            // TriggerCall();
        });
    }, []);

    useEffect(() => {
        const subscribe = messaging().onMessage(async (remoteMessage: any) => {
            console.log(remoteMessage);

            let message_body = remoteMessage.notification.body;
            let message_title = remoteMessage.notification.title;

            Alert.alert(message_title, message_body);
            navigation.navigate('EmergencyProtocol');
            // TriggerCall();
        });

        return subscribe;
    }, []);
    const { dispatch } = useContext(AppContext);

    return (
        <View style={styles.page}>
            <ScrollView>
                <Button
                    title="Detect"
                    onPress={() => {
                        navigation.navigate('EmergencyProtocol');
                    }}
                />
                <Button
                    title="Healthy/Monitor Heart"
                    onPress={() => {
                        dispatch({ type: BackgroundMode.MONITOR_HEART });
                        fetch('http://54.190.226.175:3000/healthy')
                            .then((response) => response.json())
                            .then((json) => {
                                console.log(json);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }}
                />
                <Button
                    title="CA"
                    onPress={() => {
                        dispatch({ type: BackgroundMode.CA_DETECTED });
                        fetch('http://54.190.226.175:3000/ca')
                            .then((response) => response.json())
                            .then((json) => {
                                console.log(json);
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }}
                />
                <Button
                    title="idle"
                    onPress={() => dispatch({ type: BackgroundMode.IDLE })}
                />
                <Text style={styles.title}>Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    This Privacy Policy describes Our policies and procedures on
                    the collection, use and disclosure of Your information when
                    You use the Service and tells You about Your privacy rights
                    and how the law protects You. We use Your Personal data to
                    provide and improve the Service. By using the Service, You
                    agree to the collection and use of information in accordance
                    with this Privacy Policy.
                </Text>
                <Text style={styles.title}>Interpretation and Definitions</Text>
                <Text style={styles.subtitle}>Interpretation</Text>
                <Text style={styles.paragraph}>
                    The words of which the initial letter is capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning regardless
                    of whether they appear in singular or in plural.
                </Text>
                <Text style={styles.subtitle}>Definitions</Text>
                <Text style={styles.paragraph}>
                    For the purposes of this Privacy Policy:
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Account means a unique account created for You to
                    access our Service or parts of our Service.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Affiliate means an entity that controls, is
                    controlled by or is under common control with a party, where
                    "control" means ownership of 50% or more of the shares,
                    equity interest or other securities entitled to vote for
                    election of directors or other managing authority.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Application means the software program provided
                    by the Company downloaded by You on any electronic device,
                    named CodeBlue
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Company, referred to as either "the Company",
                    "We", "Us" or "Our" in this Agreement, refers to CodeBlue.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Country refers to: British Columbia, Canada
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Device means any device that can access the
                    Service such as a computer, a cellphone or a digital tablet.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Personal Data is any information that relates to
                    an identified or identifiable individual.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Service refers to the Application.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Service Provider means any natural or legal
                    person who processes the data on behalf of the Company. It
                    refers to third-party companies or individuals employed by
                    the Company to facilitate the Service, to provide the
                    Service on behalf of the Company, to perform services
                    related to the Service or to assist the Company in analyzing
                    how the Service is used.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Usage Data refers to data collected
                    automatically, either generated by the use of the Service or
                    from the Service infrastructure itself (for example, the
                    duration of a page visit).
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} You means the individual accessing or using the
                    Service, or the company, or other legal entity on behalf of
                    which such individual is accessing or using the Service, as
                    applicable.
                </Text>
                <Text style={styles.title}>
                    Collecting and Using Your Personal Data
                </Text>
                <Text style={styles.subtitle}>Types of Data Collected</Text>
                <Text style={styles.subsubtitle}>Personal Data</Text>
                <Text style={styles.paragraph}>
                    While using Our Service, We may ask You to provide Us with
                    certain personally identifiable information that can be used
                    to contact or identify You. Personally identifiable
                    information may include, but is not limited to:
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} First name and last name
                </Text>
                <Text style={styles.bullet}>{'\u2022'} Usage Data</Text>
                <Text style={styles.subsubtitle}>Usage Data</Text>
                <Text style={styles.paragraph}>
                    Usage Data is collected automatically when using the
                    Service. Usage Data may include information such as Your
                    Device's Internet Protocol address, e.g. IP address, browser
                    type, browser version, the pages of our Service that You
                    visit, the time and date of Your visit, the time spent on
                    those pages, unique device identifiers and other diagnostic
                    data. When You access the Service by or through a mobile
                    device, We may collect certain information automatically,
                    including, but not limited to, the type of mobile device You
                    use, Your mobile device unique ID, the IP address of Your
                    mobile device, Your mobile operating system, the type of
                    mobile Internet browser You use, unique device identifiers
                    and other diagnostic data. We may also collect information
                    that Your browser sends whenever You visit our Service or
                    when You access the Service by or through a mobile device.
                </Text>
                <Text style={styles.subsubtitle}>
                    Information Collected while Using the Application
                </Text>
                <Text style={styles.paragraph}>
                    While using Our Application, in order to provide features of
                    Our Application, We may collect, with Your prior permission:
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Information regarding your location
                </Text>
                <Text style={styles.paragraph}>
                    We use this information to provide features of Our Service,
                    to improve and customize Our Service. The information may be
                    uploaded to the Company's servers and/or a Service
                    Provider's server or it may be simply stored on Your device.
                    You can enable or disable access to this information at any
                    time, through Your Device settings.
                </Text>
                <Text style={styles.subtitle}>Use of Your Personal Data</Text>
                <Text style={styles.paragraph}>
                    The Company may use Personal Data for the following
                    purposes:
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} To provide and maintain our Service , including
                    to monitor the usage of our Service.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} To manage Your Account: to manage Your
                    registration as a user of the Service. The Personal Data You
                    provide can give You access to different functionalities of
                    the Service that are available to You as a registered user.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} For the performance of a contract: the
                    development, compliance and undertaking of the purchase
                    contract for the products, items or services You have
                    purchased or of any other contract with Us through the
                    Service.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} To contact You: To contact You by email,
                    telephone calls, SMS, or other equivalent forms of
                    electronic communication, such as a mobile application's
                    push notifications regarding updates or informative
                    communications related to the functionalities, products or
                    contracted services, including the security updates, when
                    necessary or reasonable for their implementation.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} To provide You with news, special offers and
                    general information about other goods, services and events
                    which we offer that are similar to those that you have
                    already purchased or enquired about unless You have opted
                    not to receive such information.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} To manage Your requests: To attend and manage
                    Your requests to Us.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} For business transfers: We may use Your
                    information to evaluate or conduct a merger, divestiture,
                    restructuring, reorganization, dissolution, or other sale or
                    transfer of some or all of Our assets, whether as a going
                    concern or as part of bankruptcy, liquidation, or similar
                    proceeding, in which Personal Data held by Us about our
                    Service users is among the assets transferred.
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} For other purposes : We may use Your information
                    for other purposes, such as data analysis, identifying usage
                    trends, determining the effectiveness of our promotional
                    campaigns and to evaluate and improve our Service, products,
                    services, marketing and your experience.
                </Text>
                <Text style={styles.bullet}>
                    We may share Your personal information in the following
                    situations:
                </Text>
                <Text style={styles.subbullet}>
                    {'\u2022'} With Service Providers: We may share Your
                    personal information with Service Providers to monitor and
                    analyze the use of our Service, to contact You.
                </Text>
                <Text style={styles.subbullet}>
                    {'\u2022'} For business transfers: We may share or transfer
                    Your personal information in connection with, or during
                    negotiations of, any merger, sale of Company assets,
                    financing, or acquisition of all or a portion of Our
                    business to another company.
                </Text>
                <Text style={styles.subbullet}>
                    {'\u2022'} With Affiliates: We may share Your information
                    with Our affiliates, in which case we will require those
                    affiliates to honor this Privacy Policy. Affiliates include
                    Our parent company and any other subsidiaries, joint venture
                    partners or other companies that We control or that are
                    under common control with Us.
                </Text>
                <Text style={styles.subbullet}>
                    {'\u2022'} With business partners: We may share Your
                    information with Our business partners to offer You certain
                    products, services or promotions.
                </Text>
                <Text style={styles.subbullet}>
                    {'\u2022'} With other users: when You share personal
                    information or otherwise interact in the public areas with
                    other users, such information may be viewed by all users and
                    may be publicly distributed outside.
                </Text>
                <Text style={styles.subbullet}>
                    {'\u2022'} With Your consent : We may disclose Your personal
                    information for any other purpose with Your consent.
                </Text>
                <Text style={styles.subtitle}>
                    Retention of Your Personal Data
                </Text>
                <Text style={styles.paragraph}>
                    The Company will retain Your Personal Data only for as long
                    as is necessary for the purposes set out in this Privacy
                    Policy. We will retain and use Your Personal Data to the
                    extent necessary to comply with our legal obligations, for
                    example, if we are required to retain your data to comply
                    with applicable laws, resolve disputes, and enforce our
                    legal agreements and policies. The Company will also retain
                    Usage Data for internal analysis purposes. Usage Data is
                    generally retained for a shorter period of time, except when
                    this data is used to strengthen the security or to improve
                    the functionality of Our Service, or We are legally
                    obligated to retain this data for longer time periods.
                </Text>
                <Text style={styles.subtitle}>
                    Transfer of Your Personal Data
                </Text>
                <Text style={styles.paragraph}>
                    Your information, including Personal Data, is processed at
                    the Company's operating offices and in any other places
                    where the parties involved in the processing are located. It
                    means that this information may be transferred to — and
                    maintained on — computers located outside of Your state,
                    province, country or other governmental jurisdiction where
                    the data protection laws may differ than those from Your
                    jurisdiction. Your consent to this Privacy Policy followed
                    by Your submission of such information represents Your
                    agreement to that transfer. The Company will take all steps
                    reasonably necessary to ensure that Your data is treated
                    securely and in accordance with this Privacy Policy and no
                    transfer of Your Personal Data will take place to an
                    organization or a country unless there are adequate controls
                    in place including the security of Your data and other
                    personal information.
                </Text>
                <Text style={styles.subtitle}>Delete Your Personal Data</Text>
                <Text style={styles.paragraph}>
                    You have the right to delete or request that We assist in
                    deleting the Personal Data that We have collected about You.
                    Our Service may give You the ability to delete certain
                    information about You from within the Service. You may
                    update, amend, or delete Your information at any time by
                    signing in to Your Account, if you have one, and visiting
                    the account settings section that allows you to manage Your
                    personal information. You may also contact Us to request
                    access to, correct, or delete any personal information that
                    You have provided to Us. Please note, however, that We may
                    need to retain certain information when we have a legal
                    obligation or lawful basis to do so.
                </Text>
                <Text style={styles.subtitle}>
                    Disclosure of Your Personal Data
                </Text>
                <Text style={styles.subsubtitle}>Business Transactions</Text>
                <Text style={styles.paragraph}>
                    If the Company is involved in a merger, acquisition or asset
                    sale, Your Personal Data may be transferred. We will provide
                    notice before Your Personal Data is transferred and becomes
                    subject to a different Privacy Policy.
                </Text>
                <Text style={styles.subsubtitle}>Law enforcement</Text>
                <Text style={styles.paragraph}>
                    Under certain circumstances, the Company may be required to
                    disclose Your Personal Data if required to do so by law or
                    in response to valid requests by public authorities (e.g. a
                    court or a government agency).
                </Text>
                <Text style={styles.subsubtitle}>Other legal requirements</Text>
                <Text style={styles.paragraph}>
                    The Company may disclose Your Personal Data in the good
                    faith belief that such action is necessary to:
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Comply with a legal obligation
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Protect and defend the rights or property of the
                    Company
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Prevent or investigate possible wrongdoing in
                    connection with the Service
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Protect the personal safety of Users of the
                    Service or the public
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} Protect against legal liability
                </Text>
                <Text style={styles.subtitle}>
                    Security of Your Personal Data
                </Text>
                <Text style={styles.paragraph}>
                    The security of Your Personal Data is important to Us, but
                    remember that no method of transmission over the Internet,
                    or method of electronic storage is 100% secure. While We
                    strive to use commercially acceptable means to protect Your
                    Personal Data, We cannot guarantee its absolute security.
                </Text>
                <Text style={styles.title}>Children's Privacy</Text>
                <Text style={styles.paragraph}>
                    Our Service does not address anyone under the age of 13. We
                    do not knowingly collect personally identifiable information
                    from anyone under the age of 13. If You are a parent or
                    guardian and You are aware that Your child has provided Us
                    with Personal Data, please contact Us. If We become aware
                    that We have collected Personal Data from anyone under the
                    age of 13 without verification of parental consent, We take
                    steps to remove that information from Our servers. If We
                    need to rely on consent as a legal basis for processing Your
                    information and Your country requires consent from a parent,
                    We may require Your parent's consent before We collect and
                    use that information.
                </Text>
                <Text style={styles.title}>Links to Other Websites</Text>
                <Text style={styles.paragraph}>
                    Our Service may contain links to other websites that are not
                    operated by Us. If You click on a third party link, You will
                    be directed to that third party's site. We strongly advise
                    You to review the Privacy Policy of every site You visit. We
                    have no control over and assume no responsibility for the
                    content, privacy policies or practices of any third party
                    sites or services.
                </Text>
                <Text style={styles.title}>Changes to this Privacy Policy</Text>
                <Text style={styles.paragraph}>
                    We may update Our Privacy Policy from time to time. We will
                    notify You of any changes by posting the new Privacy Policy
                    on this page. We will let You know via email and/or a
                    prominent notice on Our Service, prior to the change
                    becoming effective and update the "Last updated" date at the
                    top of this Privacy Policy. You are advised to review this
                    Privacy Policy periodically for any changes. Changes to this
                    Privacy Policy are effective when they are posted on this
                    page.
                </Text>
                <Text style={styles.lasttitle}>Contact Us</Text>
                <Text style={styles.paragraph}></Text>
                <Text style={styles.paragraph}>
                    If you have any questions about this Privacy Policy, You can
                    contact us:
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} By email: cansave@ubc.ca
                </Text>
                <Text style={styles.bullet}>
                    {'\u2022'} By visiting this page on our website:
                    https://cansave.ubc.ca/
                </Text>
                <Text style={styles.lastbullet}>
                    {'\u2022'} By mail: 4th floor, 1190 Hornby Street Vancouver,
                    BC Canada
                </Text>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    page: {
        height: '100%',
        flexDirection: 'column',
        backgroundColor: Colours.WHITE
    },
    title: {
        fontFamily: 'DMSans-Bold',
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 10,
        color: Colours.BLACK,
        fontSize: 24
    },
    subtitle: {
        fontFamily: 'DMSans-Bold',
        marginLeft: 20,
        marginBottom: 10,
        color: Colours.BLACK,
        fontSize: 20
    },
    lasttitle: {
        fontFamily: 'DMSans-Bold',
        marginLeft: 20,
        marginTop: 30,
        color: Colours.BLACK,
        fontSize: 24
    },
    subsubtitle: {
        fontFamily: 'DMSans-Bold',
        marginLeft: 20,
        marginTop: 5,
        marginBottom: 5,
        color: Colours.BLACK,
        fontSize: 16
    },
    paragraph: {
        fontFamily: 'DMSans-Regular',
        color: Colours.BLACK,
        fontSize: 12,
        marginHorizontal: 20,
        marginBottom: 10,
        textAlign: 'left'
    },
    bullet: {
        fontFamily: 'DMSans-Regular',
        color: Colours.BLACK,
        fontSize: 12,
        marginHorizontal: 20,
        marginLeft: 30,
        marginBottom: 10,
        textAlign: 'left'
    },
    subbullet: {
        fontFamily: 'DMSans-Regular',
        color: Colours.BLACK,
        fontSize: 12,
        marginHorizontal: 20,
        marginLeft: 50,
        marginBottom: 10,
        textAlign: 'left'
    },
    lastbullet: {
        fontFamily: 'DMSans-Regular',
        color: Colours.BLACK,
        fontSize: 12,
        marginHorizontal: 20,
        marginLeft: 30,
        marginBottom: 60,
        textAlign: 'left'
    }
});
