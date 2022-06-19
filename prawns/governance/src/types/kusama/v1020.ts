import type {Result} from './support'

export type VoteThreshold = VoteThreshold_SuperMajorityApprove | VoteThreshold_SuperMajorityAgainst | VoteThreshold_SimpleMajority

export interface VoteThreshold_SuperMajorityApprove {
  __kind: 'SuperMajorityApprove'
}

export interface VoteThreshold_SuperMajorityAgainst {
  __kind: 'SuperMajorityAgainst'
}

export interface VoteThreshold_SimpleMajority {
  __kind: 'SimpleMajority'
}

export type Type_17 = Type_17_Idx0 | Type_17_Idx1 | Type_17_Idx2 | Type_17_Idx3 | Type_17_Idx4 | Type_17_Idx5 | Type_17_Idx6 | Type_17_Idx7 | Type_17_Idx8 | Type_17_Idx9 | Type_17_Idx10 | Type_17_Idx11 | Type_17_Idx12 | Type_17_Idx13 | Type_17_Idx14 | Type_17_Idx15 | Type_17_Idx16 | Type_17_Idx17 | Type_17_Idx18 | Type_17_Idx19 | Type_17_Idx20 | Type_17_Idx21 | Type_17_Idx22 | Type_17_Idx23 | Type_17_Idx24 | Type_17_Idx25 | Type_17_Idx26 | Type_17_Idx27 | Type_17_Idx28 | Type_17_Idx29 | Type_17_Idx30 | Type_17_Idx31 | Type_17_Idx32 | Type_17_Idx33 | Type_17_Idx34 | Type_17_Idx35 | Type_17_Idx36 | Type_17_Idx37 | Type_17_Idx38 | Type_17_Idx39 | Type_17_Idx40 | Type_17_Idx41 | Type_17_Idx42 | Type_17_Idx43 | Type_17_Idx44 | Type_17_Idx45 | Type_17_Idx46 | Type_17_Idx47 | Type_17_Idx48 | Type_17_Idx49 | Type_17_Idx50 | Type_17_Idx51 | Type_17_Idx52 | Type_17_Idx53 | Type_17_Idx54 | Type_17_Idx55 | Type_17_Idx56 | Type_17_Idx57 | Type_17_Idx58 | Type_17_Idx59 | Type_17_Idx60 | Type_17_Idx61 | Type_17_Idx62 | Type_17_Idx63 | Type_17_Idx64 | Type_17_Idx65 | Type_17_Idx66 | Type_17_Idx67 | Type_17_Idx68 | Type_17_Idx69 | Type_17_Idx70 | Type_17_Idx71 | Type_17_Idx72 | Type_17_Idx73 | Type_17_Idx74 | Type_17_Idx75 | Type_17_Idx76 | Type_17_Idx77 | Type_17_Idx78 | Type_17_Idx79 | Type_17_Idx80 | Type_17_Idx81 | Type_17_Idx82 | Type_17_Idx83 | Type_17_Idx84 | Type_17_Idx85 | Type_17_Idx86 | Type_17_Idx87 | Type_17_Idx88 | Type_17_Idx89 | Type_17_Idx90 | Type_17_Idx91 | Type_17_Idx92 | Type_17_Idx93 | Type_17_Idx94 | Type_17_Idx95 | Type_17_Idx96 | Type_17_Idx97 | Type_17_Idx98 | Type_17_Idx99 | Type_17_Idx100 | Type_17_Idx101 | Type_17_Idx102 | Type_17_Idx103 | Type_17_Idx104 | Type_17_Idx105 | Type_17_Idx106 | Type_17_Idx107 | Type_17_Idx108 | Type_17_Idx109 | Type_17_Idx110 | Type_17_Idx111 | Type_17_Idx112 | Type_17_Idx113 | Type_17_Idx114 | Type_17_Idx115 | Type_17_Idx116 | Type_17_Idx117 | Type_17_Idx118 | Type_17_Idx119 | Type_17_Idx120 | Type_17_Idx121 | Type_17_Idx122 | Type_17_Idx123 | Type_17_Idx124 | Type_17_Idx125 | Type_17_Idx126 | Type_17_Idx127 | Type_17_Idx128 | Type_17_Idx129 | Type_17_Idx130 | Type_17_Idx131 | Type_17_Idx132 | Type_17_Idx133 | Type_17_Idx134 | Type_17_Idx135 | Type_17_Idx136 | Type_17_Idx137 | Type_17_Idx138 | Type_17_Idx139 | Type_17_Idx140 | Type_17_Idx141 | Type_17_Idx142 | Type_17_Idx143 | Type_17_Idx144 | Type_17_Idx145 | Type_17_Idx146 | Type_17_Idx147 | Type_17_Idx148 | Type_17_Idx149 | Type_17_Idx150 | Type_17_Idx151 | Type_17_Idx152 | Type_17_Idx153 | Type_17_Idx154 | Type_17_Idx155 | Type_17_Idx156 | Type_17_Idx157 | Type_17_Idx158 | Type_17_Idx159 | Type_17_Idx160 | Type_17_Idx161 | Type_17_Idx162 | Type_17_Idx163 | Type_17_Idx164 | Type_17_Idx165 | Type_17_Idx166 | Type_17_Idx167 | Type_17_Idx168 | Type_17_Idx169 | Type_17_Idx170 | Type_17_Idx171 | Type_17_Idx172 | Type_17_Idx173 | Type_17_Idx174 | Type_17_Idx175 | Type_17_Idx176 | Type_17_Idx177 | Type_17_Idx178 | Type_17_Idx179 | Type_17_Idx180 | Type_17_Idx181 | Type_17_Idx182 | Type_17_Idx183 | Type_17_Idx184 | Type_17_Idx185 | Type_17_Idx186 | Type_17_Idx187 | Type_17_Idx188 | Type_17_Idx189 | Type_17_Idx190 | Type_17_Idx191 | Type_17_Idx192 | Type_17_Idx193 | Type_17_Idx194 | Type_17_Idx195 | Type_17_Idx196 | Type_17_Idx197 | Type_17_Idx198 | Type_17_Idx199 | Type_17_Idx200 | Type_17_Idx201 | Type_17_Idx202 | Type_17_Idx203 | Type_17_Idx204 | Type_17_Idx205 | Type_17_Idx206 | Type_17_Idx207 | Type_17_Idx208 | Type_17_Idx209 | Type_17_Idx210 | Type_17_Idx211 | Type_17_Idx212 | Type_17_Idx213 | Type_17_Idx214 | Type_17_Idx215 | Type_17_Idx216 | Type_17_Idx217 | Type_17_Idx218 | Type_17_Idx219 | Type_17_Idx220 | Type_17_Idx221 | Type_17_Idx222 | Type_17_Idx223 | Type_17_Idx224 | Type_17_Idx225 | Type_17_Idx226 | Type_17_Idx227 | Type_17_Idx228 | Type_17_Idx229 | Type_17_Idx230 | Type_17_Idx231 | Type_17_Idx232 | Type_17_Idx233 | Type_17_Idx234 | Type_17_Idx235 | Type_17_Idx236 | Type_17_Idx237 | Type_17_Idx238 | Type_17_IdxU16 | Type_17_IdxU32 | Type_17_IdxU64 | Type_17_AccountId

export interface Type_17_Idx0 {
  __kind: 'Idx0'
}

export interface Type_17_Idx1 {
  __kind: 'Idx1'
}

export interface Type_17_Idx2 {
  __kind: 'Idx2'
}

export interface Type_17_Idx3 {
  __kind: 'Idx3'
}

export interface Type_17_Idx4 {
  __kind: 'Idx4'
}

export interface Type_17_Idx5 {
  __kind: 'Idx5'
}

export interface Type_17_Idx6 {
  __kind: 'Idx6'
}

export interface Type_17_Idx7 {
  __kind: 'Idx7'
}

export interface Type_17_Idx8 {
  __kind: 'Idx8'
}

export interface Type_17_Idx9 {
  __kind: 'Idx9'
}

export interface Type_17_Idx10 {
  __kind: 'Idx10'
}

export interface Type_17_Idx11 {
  __kind: 'Idx11'
}

export interface Type_17_Idx12 {
  __kind: 'Idx12'
}

export interface Type_17_Idx13 {
  __kind: 'Idx13'
}

export interface Type_17_Idx14 {
  __kind: 'Idx14'
}

export interface Type_17_Idx15 {
  __kind: 'Idx15'
}

export interface Type_17_Idx16 {
  __kind: 'Idx16'
}

export interface Type_17_Idx17 {
  __kind: 'Idx17'
}

export interface Type_17_Idx18 {
  __kind: 'Idx18'
}

export interface Type_17_Idx19 {
  __kind: 'Idx19'
}

export interface Type_17_Idx20 {
  __kind: 'Idx20'
}

export interface Type_17_Idx21 {
  __kind: 'Idx21'
}

export interface Type_17_Idx22 {
  __kind: 'Idx22'
}

export interface Type_17_Idx23 {
  __kind: 'Idx23'
}

export interface Type_17_Idx24 {
  __kind: 'Idx24'
}

export interface Type_17_Idx25 {
  __kind: 'Idx25'
}

export interface Type_17_Idx26 {
  __kind: 'Idx26'
}

export interface Type_17_Idx27 {
  __kind: 'Idx27'
}

export interface Type_17_Idx28 {
  __kind: 'Idx28'
}

export interface Type_17_Idx29 {
  __kind: 'Idx29'
}

export interface Type_17_Idx30 {
  __kind: 'Idx30'
}

export interface Type_17_Idx31 {
  __kind: 'Idx31'
}

export interface Type_17_Idx32 {
  __kind: 'Idx32'
}

export interface Type_17_Idx33 {
  __kind: 'Idx33'
}

export interface Type_17_Idx34 {
  __kind: 'Idx34'
}

export interface Type_17_Idx35 {
  __kind: 'Idx35'
}

export interface Type_17_Idx36 {
  __kind: 'Idx36'
}

export interface Type_17_Idx37 {
  __kind: 'Idx37'
}

export interface Type_17_Idx38 {
  __kind: 'Idx38'
}

export interface Type_17_Idx39 {
  __kind: 'Idx39'
}

export interface Type_17_Idx40 {
  __kind: 'Idx40'
}

export interface Type_17_Idx41 {
  __kind: 'Idx41'
}

export interface Type_17_Idx42 {
  __kind: 'Idx42'
}

export interface Type_17_Idx43 {
  __kind: 'Idx43'
}

export interface Type_17_Idx44 {
  __kind: 'Idx44'
}

export interface Type_17_Idx45 {
  __kind: 'Idx45'
}

export interface Type_17_Idx46 {
  __kind: 'Idx46'
}

export interface Type_17_Idx47 {
  __kind: 'Idx47'
}

export interface Type_17_Idx48 {
  __kind: 'Idx48'
}

export interface Type_17_Idx49 {
  __kind: 'Idx49'
}

export interface Type_17_Idx50 {
  __kind: 'Idx50'
}

export interface Type_17_Idx51 {
  __kind: 'Idx51'
}

export interface Type_17_Idx52 {
  __kind: 'Idx52'
}

export interface Type_17_Idx53 {
  __kind: 'Idx53'
}

export interface Type_17_Idx54 {
  __kind: 'Idx54'
}

export interface Type_17_Idx55 {
  __kind: 'Idx55'
}

export interface Type_17_Idx56 {
  __kind: 'Idx56'
}

export interface Type_17_Idx57 {
  __kind: 'Idx57'
}

export interface Type_17_Idx58 {
  __kind: 'Idx58'
}

export interface Type_17_Idx59 {
  __kind: 'Idx59'
}

export interface Type_17_Idx60 {
  __kind: 'Idx60'
}

export interface Type_17_Idx61 {
  __kind: 'Idx61'
}

export interface Type_17_Idx62 {
  __kind: 'Idx62'
}

export interface Type_17_Idx63 {
  __kind: 'Idx63'
}

export interface Type_17_Idx64 {
  __kind: 'Idx64'
}

export interface Type_17_Idx65 {
  __kind: 'Idx65'
}

export interface Type_17_Idx66 {
  __kind: 'Idx66'
}

export interface Type_17_Idx67 {
  __kind: 'Idx67'
}

export interface Type_17_Idx68 {
  __kind: 'Idx68'
}

export interface Type_17_Idx69 {
  __kind: 'Idx69'
}

export interface Type_17_Idx70 {
  __kind: 'Idx70'
}

export interface Type_17_Idx71 {
  __kind: 'Idx71'
}

export interface Type_17_Idx72 {
  __kind: 'Idx72'
}

export interface Type_17_Idx73 {
  __kind: 'Idx73'
}

export interface Type_17_Idx74 {
  __kind: 'Idx74'
}

export interface Type_17_Idx75 {
  __kind: 'Idx75'
}

export interface Type_17_Idx76 {
  __kind: 'Idx76'
}

export interface Type_17_Idx77 {
  __kind: 'Idx77'
}

export interface Type_17_Idx78 {
  __kind: 'Idx78'
}

export interface Type_17_Idx79 {
  __kind: 'Idx79'
}

export interface Type_17_Idx80 {
  __kind: 'Idx80'
}

export interface Type_17_Idx81 {
  __kind: 'Idx81'
}

export interface Type_17_Idx82 {
  __kind: 'Idx82'
}

export interface Type_17_Idx83 {
  __kind: 'Idx83'
}

export interface Type_17_Idx84 {
  __kind: 'Idx84'
}

export interface Type_17_Idx85 {
  __kind: 'Idx85'
}

export interface Type_17_Idx86 {
  __kind: 'Idx86'
}

export interface Type_17_Idx87 {
  __kind: 'Idx87'
}

export interface Type_17_Idx88 {
  __kind: 'Idx88'
}

export interface Type_17_Idx89 {
  __kind: 'Idx89'
}

export interface Type_17_Idx90 {
  __kind: 'Idx90'
}

export interface Type_17_Idx91 {
  __kind: 'Idx91'
}

export interface Type_17_Idx92 {
  __kind: 'Idx92'
}

export interface Type_17_Idx93 {
  __kind: 'Idx93'
}

export interface Type_17_Idx94 {
  __kind: 'Idx94'
}

export interface Type_17_Idx95 {
  __kind: 'Idx95'
}

export interface Type_17_Idx96 {
  __kind: 'Idx96'
}

export interface Type_17_Idx97 {
  __kind: 'Idx97'
}

export interface Type_17_Idx98 {
  __kind: 'Idx98'
}

export interface Type_17_Idx99 {
  __kind: 'Idx99'
}

export interface Type_17_Idx100 {
  __kind: 'Idx100'
}

export interface Type_17_Idx101 {
  __kind: 'Idx101'
}

export interface Type_17_Idx102 {
  __kind: 'Idx102'
}

export interface Type_17_Idx103 {
  __kind: 'Idx103'
}

export interface Type_17_Idx104 {
  __kind: 'Idx104'
}

export interface Type_17_Idx105 {
  __kind: 'Idx105'
}

export interface Type_17_Idx106 {
  __kind: 'Idx106'
}

export interface Type_17_Idx107 {
  __kind: 'Idx107'
}

export interface Type_17_Idx108 {
  __kind: 'Idx108'
}

export interface Type_17_Idx109 {
  __kind: 'Idx109'
}

export interface Type_17_Idx110 {
  __kind: 'Idx110'
}

export interface Type_17_Idx111 {
  __kind: 'Idx111'
}

export interface Type_17_Idx112 {
  __kind: 'Idx112'
}

export interface Type_17_Idx113 {
  __kind: 'Idx113'
}

export interface Type_17_Idx114 {
  __kind: 'Idx114'
}

export interface Type_17_Idx115 {
  __kind: 'Idx115'
}

export interface Type_17_Idx116 {
  __kind: 'Idx116'
}

export interface Type_17_Idx117 {
  __kind: 'Idx117'
}

export interface Type_17_Idx118 {
  __kind: 'Idx118'
}

export interface Type_17_Idx119 {
  __kind: 'Idx119'
}

export interface Type_17_Idx120 {
  __kind: 'Idx120'
}

export interface Type_17_Idx121 {
  __kind: 'Idx121'
}

export interface Type_17_Idx122 {
  __kind: 'Idx122'
}

export interface Type_17_Idx123 {
  __kind: 'Idx123'
}

export interface Type_17_Idx124 {
  __kind: 'Idx124'
}

export interface Type_17_Idx125 {
  __kind: 'Idx125'
}

export interface Type_17_Idx126 {
  __kind: 'Idx126'
}

export interface Type_17_Idx127 {
  __kind: 'Idx127'
}

export interface Type_17_Idx128 {
  __kind: 'Idx128'
}

export interface Type_17_Idx129 {
  __kind: 'Idx129'
}

export interface Type_17_Idx130 {
  __kind: 'Idx130'
}

export interface Type_17_Idx131 {
  __kind: 'Idx131'
}

export interface Type_17_Idx132 {
  __kind: 'Idx132'
}

export interface Type_17_Idx133 {
  __kind: 'Idx133'
}

export interface Type_17_Idx134 {
  __kind: 'Idx134'
}

export interface Type_17_Idx135 {
  __kind: 'Idx135'
}

export interface Type_17_Idx136 {
  __kind: 'Idx136'
}

export interface Type_17_Idx137 {
  __kind: 'Idx137'
}

export interface Type_17_Idx138 {
  __kind: 'Idx138'
}

export interface Type_17_Idx139 {
  __kind: 'Idx139'
}

export interface Type_17_Idx140 {
  __kind: 'Idx140'
}

export interface Type_17_Idx141 {
  __kind: 'Idx141'
}

export interface Type_17_Idx142 {
  __kind: 'Idx142'
}

export interface Type_17_Idx143 {
  __kind: 'Idx143'
}

export interface Type_17_Idx144 {
  __kind: 'Idx144'
}

export interface Type_17_Idx145 {
  __kind: 'Idx145'
}

export interface Type_17_Idx146 {
  __kind: 'Idx146'
}

export interface Type_17_Idx147 {
  __kind: 'Idx147'
}

export interface Type_17_Idx148 {
  __kind: 'Idx148'
}

export interface Type_17_Idx149 {
  __kind: 'Idx149'
}

export interface Type_17_Idx150 {
  __kind: 'Idx150'
}

export interface Type_17_Idx151 {
  __kind: 'Idx151'
}

export interface Type_17_Idx152 {
  __kind: 'Idx152'
}

export interface Type_17_Idx153 {
  __kind: 'Idx153'
}

export interface Type_17_Idx154 {
  __kind: 'Idx154'
}

export interface Type_17_Idx155 {
  __kind: 'Idx155'
}

export interface Type_17_Idx156 {
  __kind: 'Idx156'
}

export interface Type_17_Idx157 {
  __kind: 'Idx157'
}

export interface Type_17_Idx158 {
  __kind: 'Idx158'
}

export interface Type_17_Idx159 {
  __kind: 'Idx159'
}

export interface Type_17_Idx160 {
  __kind: 'Idx160'
}

export interface Type_17_Idx161 {
  __kind: 'Idx161'
}

export interface Type_17_Idx162 {
  __kind: 'Idx162'
}

export interface Type_17_Idx163 {
  __kind: 'Idx163'
}

export interface Type_17_Idx164 {
  __kind: 'Idx164'
}

export interface Type_17_Idx165 {
  __kind: 'Idx165'
}

export interface Type_17_Idx166 {
  __kind: 'Idx166'
}

export interface Type_17_Idx167 {
  __kind: 'Idx167'
}

export interface Type_17_Idx168 {
  __kind: 'Idx168'
}

export interface Type_17_Idx169 {
  __kind: 'Idx169'
}

export interface Type_17_Idx170 {
  __kind: 'Idx170'
}

export interface Type_17_Idx171 {
  __kind: 'Idx171'
}

export interface Type_17_Idx172 {
  __kind: 'Idx172'
}

export interface Type_17_Idx173 {
  __kind: 'Idx173'
}

export interface Type_17_Idx174 {
  __kind: 'Idx174'
}

export interface Type_17_Idx175 {
  __kind: 'Idx175'
}

export interface Type_17_Idx176 {
  __kind: 'Idx176'
}

export interface Type_17_Idx177 {
  __kind: 'Idx177'
}

export interface Type_17_Idx178 {
  __kind: 'Idx178'
}

export interface Type_17_Idx179 {
  __kind: 'Idx179'
}

export interface Type_17_Idx180 {
  __kind: 'Idx180'
}

export interface Type_17_Idx181 {
  __kind: 'Idx181'
}

export interface Type_17_Idx182 {
  __kind: 'Idx182'
}

export interface Type_17_Idx183 {
  __kind: 'Idx183'
}

export interface Type_17_Idx184 {
  __kind: 'Idx184'
}

export interface Type_17_Idx185 {
  __kind: 'Idx185'
}

export interface Type_17_Idx186 {
  __kind: 'Idx186'
}

export interface Type_17_Idx187 {
  __kind: 'Idx187'
}

export interface Type_17_Idx188 {
  __kind: 'Idx188'
}

export interface Type_17_Idx189 {
  __kind: 'Idx189'
}

export interface Type_17_Idx190 {
  __kind: 'Idx190'
}

export interface Type_17_Idx191 {
  __kind: 'Idx191'
}

export interface Type_17_Idx192 {
  __kind: 'Idx192'
}

export interface Type_17_Idx193 {
  __kind: 'Idx193'
}

export interface Type_17_Idx194 {
  __kind: 'Idx194'
}

export interface Type_17_Idx195 {
  __kind: 'Idx195'
}

export interface Type_17_Idx196 {
  __kind: 'Idx196'
}

export interface Type_17_Idx197 {
  __kind: 'Idx197'
}

export interface Type_17_Idx198 {
  __kind: 'Idx198'
}

export interface Type_17_Idx199 {
  __kind: 'Idx199'
}

export interface Type_17_Idx200 {
  __kind: 'Idx200'
}

export interface Type_17_Idx201 {
  __kind: 'Idx201'
}

export interface Type_17_Idx202 {
  __kind: 'Idx202'
}

export interface Type_17_Idx203 {
  __kind: 'Idx203'
}

export interface Type_17_Idx204 {
  __kind: 'Idx204'
}

export interface Type_17_Idx205 {
  __kind: 'Idx205'
}

export interface Type_17_Idx206 {
  __kind: 'Idx206'
}

export interface Type_17_Idx207 {
  __kind: 'Idx207'
}

export interface Type_17_Idx208 {
  __kind: 'Idx208'
}

export interface Type_17_Idx209 {
  __kind: 'Idx209'
}

export interface Type_17_Idx210 {
  __kind: 'Idx210'
}

export interface Type_17_Idx211 {
  __kind: 'Idx211'
}

export interface Type_17_Idx212 {
  __kind: 'Idx212'
}

export interface Type_17_Idx213 {
  __kind: 'Idx213'
}

export interface Type_17_Idx214 {
  __kind: 'Idx214'
}

export interface Type_17_Idx215 {
  __kind: 'Idx215'
}

export interface Type_17_Idx216 {
  __kind: 'Idx216'
}

export interface Type_17_Idx217 {
  __kind: 'Idx217'
}

export interface Type_17_Idx218 {
  __kind: 'Idx218'
}

export interface Type_17_Idx219 {
  __kind: 'Idx219'
}

export interface Type_17_Idx220 {
  __kind: 'Idx220'
}

export interface Type_17_Idx221 {
  __kind: 'Idx221'
}

export interface Type_17_Idx222 {
  __kind: 'Idx222'
}

export interface Type_17_Idx223 {
  __kind: 'Idx223'
}

export interface Type_17_Idx224 {
  __kind: 'Idx224'
}

export interface Type_17_Idx225 {
  __kind: 'Idx225'
}

export interface Type_17_Idx226 {
  __kind: 'Idx226'
}

export interface Type_17_Idx227 {
  __kind: 'Idx227'
}

export interface Type_17_Idx228 {
  __kind: 'Idx228'
}

export interface Type_17_Idx229 {
  __kind: 'Idx229'
}

export interface Type_17_Idx230 {
  __kind: 'Idx230'
}

export interface Type_17_Idx231 {
  __kind: 'Idx231'
}

export interface Type_17_Idx232 {
  __kind: 'Idx232'
}

export interface Type_17_Idx233 {
  __kind: 'Idx233'
}

export interface Type_17_Idx234 {
  __kind: 'Idx234'
}

export interface Type_17_Idx235 {
  __kind: 'Idx235'
}

export interface Type_17_Idx236 {
  __kind: 'Idx236'
}

export interface Type_17_Idx237 {
  __kind: 'Idx237'
}

export interface Type_17_Idx238 {
  __kind: 'Idx238'
}

export interface Type_17_IdxU16 {
  __kind: 'IdxU16'
  value: number
}

export interface Type_17_IdxU32 {
  __kind: 'IdxU32'
  value: number
}

export interface Type_17_IdxU64 {
  __kind: 'IdxU64'
  value: bigint
}

export interface Type_17_AccountId {
  __kind: 'AccountId'
  value: Uint8Array
}
